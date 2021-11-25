import { useState, useEffect } from "react";
import ErrorMsg from "../general/ErrorMsg";
import SuccessMsg from "../general/SuccessMsg";
// firestore
import {
  doc,
  getDoc,
  setDoc,
  Timestamp,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import FullScreenLoader from "../general/FullScreenLoader";
// font icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faInfoCircle,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
// modals
import { Modal } from "react-bootstrap";

const UserSettingsForm = (props) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const [btnLoading, setBtnLoading] = useState(false);
  const [errFirstName, setErrFirstName] = useState("");
  const [errLastName, setErrLastName] = useState("");

  const loggedInUser = props.loggedInUser;
  let deleteReqArray = [];

  const [textArea, setTextArea] = useState("");
  const [errorTextArea, setErrorTextArea] = useState("");
  const [emailStatus, setEmailStatus] = useState(false);
  const [deleteReqStatus, setDeleteReqStatus] = useState(false);

  const [deleteTimestamp, setDeleteTimestamp] = useState([]);

  // modals
  const [SaveChanges, setSaveChanges] = useState(false);
  const handleCloseChanges = () => setSaveChanges(false);
  const handleOpenChanges = () => setSaveChanges(true);

  const [showInfo, setShowInfo] = useState(false);
  const handleCloseInfo = () => setShowInfo(false);
  const handleOpenInfo = () => setShowInfo(true);

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const handleOpenDelete = () => setShowDelete(true);

  const [showEmail, setShowEmail] = useState(false);
  const handleCloseEmail = () => {
    setShowEmail(false);
    setTimeout(function () {
      setEmailStatus(false);
      setTextArea("");
      setErrorTextArea("");
    }, 150);
  };

  const handleOpenEmail = () => setShowEmail(true);

  const sendEmailHandler = () => {
    if (textArea === "" || textArea === null || textArea === undefined) {
      setErrorTextArea("Το μήνυμα δεν μπορεί να είναι άδειο.");
    } else {
      setErrorTextArea("");
      setEmailStatus(true);
      (async () => {
        await addDoc(collection(db, "admin_ContactMsgs"), {
          userEmail: loggedInUser,
          text: textArea,
          submitDate: Timestamp.fromDate(new Date()),
        });
      })();
    }
  };

  const fetchUserData = async () => {
    const docRef = doc(db, "users", loggedInUser);
    const docSnap = await getDoc(docRef);
    setUserData(docSnap.data());

    setUserData((userData) => ({
      ...userData,
      accModifications: Timestamp.fromDate(new Date()),
    }));

    const q = query(
      collection(db, "admin_DeleteDataRequests"),
      where("userEmail", "==", loggedInUser)
    );

    const docSnapDelete = await getDocs(q);
    docSnapDelete.forEach((doc) => {
      deleteReqArray.push(doc.data());
    });

    setDeleteTimestamp(deleteReqArray);

    if (deleteReqArray[0] === undefined || deleteReqArray[0] === null) {
      setDeleteReqStatus(false);
    } else {
      setDeleteReqStatus(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchUserData().finally(
      setTimeout(function () {
        setLoading(false);
      }, 0)
    );
  }, []);

  const ValidateFirstName = (firstName) => {
    if (firstName.length < 4) {
      setErrFirstName(
        "Το όνομα δε μπορεί να έχει λιγότερους από 4 χαρακτήρες."
      );
    } else {
      setErrFirstName("");
    }
  };

  const ValidateLastName = (lastName) => {
    if (lastName.length < 4) {
      setErrLastName(
        "Το επώνυμο δε μπορεί να έχει λιγότερους από 4 χαρακτήρες."
      );
    } else {
      setErrLastName("");
    }
  };

  const FormHandler = () => {
    setBtnLoading(true);
    let isValid = false;

    if (
      errFirstName === "" &&
      errLastName === "" &&
      userData.firstName !== "" &&
      userData.firstName.length > 3 &&
      userData.lastName.length > 3 &&
      userData.lastName !== ""
    ) {
      isValid = true;
    }

    if (isValid) {
      const UserSettingsRef = doc(db, "users", loggedInUser);
      setDoc(UserSettingsRef, userData, { merge: true });
      setSaveChanges(true);
    } else {
      alert("Προέκυψε σφάλμα, παρακαλώ προσπαθήστε αργότερα.");
    }

    setTimeout(function () {
      setBtnLoading(false);
    }, 150);
  };

  const DeleteDataHandler = () => {
    (async () => {
      await addDoc(collection(db, "admin_DeleteDataRequests"), {
        userEmail: loggedInUser,
        submitDate: Timestamp.fromDate(new Date()),
      });
    })();
    setDeleteReqStatus(true);
  };

  return (
    <div>
      {loading ? (
        <FullScreenLoader />
      ) : (
        <div>
          <div className="pt-5 mt-5 form-custom">
            <div className="row">
              <u>
                <h6>Προσωπικά Στοιχεία:</h6>{" "}
              </u>
              <div className="col-sm-12 col-lg-4 mt-4">
                <label className="label">Όνομα</label>
                <input
                  type="text"
                  className="inputValues"
                  value={userData.firstName}
                  onInput={(e) => ValidateFirstName(e.target.value)}
                  onChange={(e) =>
                    setUserData((userData) => ({
                      ...userData,
                      firstName: e.target.value,
                    }))
                  }
                />
                {errFirstName ? <ErrorMsg ErrorMsg={errFirstName} /> : null}
              </div>
              <div className="col-sm-12 col-lg-4 mt-4">
                <label className="label">Επώνυμο</label>
                <input
                  type="text"
                  className="inputValues"
                  value={userData.lastName}
                  onInput={(e) => ValidateLastName(e.target.value)}
                  onChange={(e) =>
                    setUserData((userData) => ({
                      ...userData,
                      lastName: e.target.value,
                    }))
                  }
                />
                {errLastName ? <ErrorMsg ErrorMsg={errLastName} /> : null}
              </div>
              <div className="col-sm-12 col-lg-4 mt-4">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="inputValues"
                  disabled={true}
                  value={userData.email}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-lg-4 mt-4">
                <label className="label">ΑΜΚΑ</label>
                <input
                  type="text"
                  className="inputValues"
                  value={userData.AMKA}
                  onChange={(e) =>
                    setUserData((userData) => ({
                      ...userData,
                      AMKA: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="col-sm-12 col-lg-4 mt-4">
                <label className="label">ΑΦΜ</label>
                <input
                  type="text"
                  className="inputValues"
                  value={userData.AFM}
                  onChange={(e) =>
                    setUserData((userData) => ({
                      ...userData,
                      AFM: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="col-sm-12 col-lg-4 mt-4">
                <label className="label">Κινητό</label>
                <input
                  type="text"
                  className="inputValues"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((userData) => ({
                      ...userData,
                      phone: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="mt-4">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={FormHandler}
                  disabled={btnLoading ? true : false}
                >
                  {btnLoading && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                  )}
                  <span>{btnLoading ? "Περιμένετε..." : "Αποθήκευση"}</span>
                </button>
              </div>
              <div className="mt-4 ms-auto"></div>
            </div>
          </div>

          {/* terms and conditions */}
          <div className="p-4 mt-5 form-custom">
            <u>
              <h6>Όροι,Προϋποθέσεις κ' Cookies εφαρμογής:</h6>
            </u>
            <div className="d-flex" id="TermsInfoUserDataBtn">
              <div className="mt-3">
                <b>Εμφάνιση των όρων και των προϋποθέσεων της εφαρμογής.</b>
              </div>
              <div className="mt-3 ms-auto">
                <button className="btn btn-info" onClick={handleOpenInfo}>
                  Πληροφορίες
                  <FontAwesomeIcon
                    size="lg"
                    icon={faInfoCircle}
                    style={{ color: "var(--bs-purple)", paddingLeft: "3px" }}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* contact me */}
          <div className="p-4 mt-5 form-custom">
            <u>
              <h6>Επικοινωνία:</h6>
            </u>
            <div className="d-flex" id="deleteUserDataBtn">
              <div className="mt-3">
                <b>Επικοινωνήστε μαζί μας και θα σας απαντήσουμε με email.</b>
              </div>
              <div className="mt-3 ms-auto">
                <button className="btn btn-warning" onClick={handleOpenEmail}>
                  Επικοινωνία
                  <FontAwesomeIcon
                    size="lg"
                    icon={faEnvelope}
                    style={{ color: "var(--bs-info)", paddingLeft: "3px" }}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* delete data  */}
          <div className="p-4 mt-5 form-custom">
            <u>
              <h6>Διαχείριση Λογαριασμού:</h6>
            </u>
            <div className="d-flex" id="deleteUserDataBtn">
              <div className="mt-3">
                <b>Διαγραφή όλων των δεδομένων μου από την εφαρμογή.</b>
              </div>
              <div className="mt-3 ms-auto">
                <button className="btn btn-dark" onClick={handleOpenDelete}>
                  Διαγραφή
                  <FontAwesomeIcon
                    size="lg"
                    icon={faTrashAlt}
                    style={{ color: "var(--bs-danger)", paddingLeft: "3px" }}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* saveChanges personal info modal */}
          <Modal show={SaveChanges} onHide={handleOpenChanges}>
            <Modal.Header>
              <Modal.Title>Αποθήκευση Αλλαγών</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Οι αλλαγές σας στα προσωπικά σας στοιχεία αποθηκεύτηκαν με
              επιτυχία.
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleCloseChanges}
              >
                Κλείσιμο
              </button>
            </Modal.Footer>
          </Modal>
          {/* end of info modal */}

          {/* info modal */}
          <Modal show={showInfo} onHide={handleCloseInfo}>
            <Modal.Header>
              <Modal.Title>Όροι,Προϋποθέσεις κ' Cookies</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>
                <b>Terms n Conditions:</b>
              </h4>
            </Modal.Body>
            <Modal.Body>
              <h4>
                <b>Cookies:</b>
              </h4>
              <p>
                Θεωρούμε σημαντικό να ξέρετε ποια είναι τα cookies που
                χρησιμοποιούνται στην ιστοσελίδα-εφαρμογή μας και για ποιούς
                λόγους αυτά χρησιμοποιούνται. Στόχος μας είναι η σωστή ενημέρωση
                και προστασία σας αλλά και η καλύτερη εμπειρία από την επίσκεψη
                σας στην εφαρμογή μας. Έτσι χρησιμοποιούμε cookies για την
                καλύτερη δυνατή λειτουργίας της, τη σωστή περιήγηση σας, τη
                σύνδεση και τη μετακίνηση στις σελίδες καθώς και για την παροχή
                διαφημιστικού περιεχομένου βασιζόμενο στα ενδιαφέροντα και τις
                ανάγκες σας (Μελλοντικά, ακόμη δεν ισχύει).
              </p>
              <p>
                Επίσης, τα cookies χρησιμοποιούνται για να αναλύσουμε πώς οι
                επισκέπτες χρησιμοποιούν τον ιστότοπο μας, πώς περιηγούνται ή αν
                αντιμετωπίζουν κάποιο πρόβλημα για να μπορέσουμε να το
                διορθώσουμε. Όλες οι πληροφορίες που συλλέγονται από αυτά τα
                cookies είναι ανώνυμες και χρησιμοποιούνται μόνο για να
                βελτιώσουμε τη δομή και το περιεχόμενο του ιστοτόπου. Τα cookies
                είναι μικρά κομμάτια πληροφορίας (αρχεία), με τη μορφή απλού
                κειμένου, που αποθηκεύονται στον υπολογιστή σας (ή σε άλλες
                συσκευές με πρόσβαση στο διαδίκτυο, όπως ένα smartphone ή
                tablet) όταν επισκέπτεστε διάφορες σελίδες στο διαδίκτυο. Τα
                Cookies δεν προκαλούν κάποια βλάβη στον ηλεκτρονικό σας
                υπολογιστή, αλλά ούτε και στα αρχεία που φυλάσσονται σε αυτόν.
                Χωρίς αυτά, οι προσωπικές σας προτιμήσεις θα ήταν αδύνατον να
                αποθηκευτούν και κάθε φορά που θα μπαίνατε σε μία ιστοσελίδα, θα
                ήταν σαν να μπαίνατε για πρώτη φορά.
              </p>
              <p>
                Μελλόντικα, θα προσθεθούν και άλλα cookies που θα κριθούν
                απαραίτητα για τη βελτιστοποίηση της εμπειρίας σας, αλλά και για
                τη λειτουργία της εφαρμογής.
              </p>

              <p>
                Αυτή τη στιγμή η εφαρογή μας χρησιμοποιεί μόνο third-party
                cookies. Συγκεκριμένα:
              </p>
              <ul>
                <li>
                  <b>Google's Firebase Authentication:</b> Είναι υπεύθυνο για
                  την αναγνώριση του χρήστη και τη διευκόλυνσή του όσο αναφορά
                  την είσοδό του στην εφαρογή, καθώς και για την ασφαλή
                  αποθήκευση των δεδομένων του. (Διάρκεια &rarr; Άπειρη, Δεν
                  λήγει ποτέ,ανανεώνεται κάθε φορά που ο χρήστης κάνει Σύνδεση
                  στην εφαρμογή.) Περισσότερες πληροφορίες:
                  <a
                    className="px-2"
                    href="  https://firebase.google.com/docs/auth"
                    target="_blank"
                  >
                    Firebase - Authentication
                  </a>
                </li>

                <li className="mt-3">
                  <b>Google's Log Events:</b> Είναι υπεύθυνο για την καταγραφή
                  γεγονότων, καταγραφή σφαλμάτων της εφαρμογής και καταγραφή των
                  προτιμήσεων του χρήστη στην εφαρμογή για τη καλύτερη εμπειρία
                  του χρήστη. Περισσότερες πληροφορίες:
                  <a
                    className="px-2"
                    href="https://firebase.google.com/docs/analytics/events?platform=web"
                    target="_blank"
                  >
                    Firebase - Log Events
                  </a>
                </li>
              </ul>
              <p>
                <b>
                  Για να είστε συνδεδεμένος και να βλέπετε τις ρυθμίσεις της
                  εφαρμογής σημαίνει πως έχετε ήδη αποδεχτεί τους όρους των
                  Cookies αλλά και τους Όρους-Προϋποθέσεις.
                </b>
              </p>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="btn btn-info"
                onClick={handleCloseInfo}
              >
                Κλείσιμο
              </button>
            </Modal.Footer>
          </Modal>
          {/* end of info modal */}

          {/* email modal */}
          <Modal show={showEmail} onHide={handleCloseEmail}>
            <Modal.Header>
              <Modal.Title>Αποστολή Μηνύματος</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label className="label">Μήνυμα</label>
              <textarea
                className="inputValues"
                rows="4"
                onChange={(e) => setTextArea(e.target.value)}
                disabled={emailStatus ? true : false}
                value={textArea}
              ></textarea>
              {errorTextArea ? (
                <ErrorMsg ErrorMsg={errorTextArea}></ErrorMsg>
              ) : null}
              {emailStatus ? (
                <SuccessMsg
                  SuccessMsg={
                    "Το μήνυμα σας στάλθηκε με επιτυχία. Θα επικοινωνήσουμε εμείς μαζί σας το συντομότερο δυνατόν."
                  }
                />
              ) : null}
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className={emailStatus ? "btn btn-success" : "btn btn-danger"}
                onClick={sendEmailHandler}
                disabled={emailStatus ? true : false}
              >
                {emailStatus ? "Στάλθηκε" : "Αποστολή"}
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={handleCloseEmail}
              >
                Κλείσιμο
              </button>
            </Modal.Footer>
          </Modal>
          {/* end of email modal */}

          {/* delete all data modal */}
          <Modal show={showDelete} onHide={handleCloseDelete}>
            <Modal.Header>
              <Modal.Title>Αίτημα Διαγραφής Δεδομένων</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Εάν προχωρήσετε στην αίτηση διαγραφής, μέσα στις επόμενες 72 ώρες
              θα διαγραφούν όλα σας τα δεδομένα από την εφαρμογή (Μετρήσεις
              ζωτικών λειτουργιών, μετρήσεις σακχάρου και PDF).
            </Modal.Body>
            <Modal.Body>
              Είστε σίγουροι ότι θέλετε να διαγράψετε όλα σας τα καταχωρημένα
              δεδομένα;
            </Modal.Body>
            <Modal.Body>
              <b>
                Αυτή η πράξη <u>ΔΕΝ</u> μπορεί να αντιστραφεί.
              </b>
              {deleteReqStatus ? (
                <SuccessMsg
                  SuccessMsg={"Το αίτημα σας στάλθηκε με επιτυχία."}
                />
              ) : null}
            </Modal.Body>

            <Modal.Footer>
              <button
                type="button"
                className={
                  deleteReqStatus ? "btn btn-success" : "btn btn-danger"
                }
                onClick={DeleteDataHandler}
                disabled={deleteReqStatus ? true : false}
              >
                {deleteReqStatus ? "Στάλθηκε" : "Διαγραφή"}
              </button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={handleCloseDelete}
              >
                Άκυρο
              </button>
            </Modal.Footer>
          </Modal>
          {/* end of delete all data modal */}
        </div>
      )}
    </div>
  );
};

export default UserSettingsForm;
