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
  const [errPhone, setErrPhone] = useState("");

  const [errAMKA, setErrAMKA] = useState("");
  const [errAFM, setErrAFM] = useState("");

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
      }, 300)
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

  const ValidatePhone = (phone) => {
    let validPhone = /^\d+$/.test(phone);

    if (phone.length > 0) {
      if (phone.length < 10 || phone.length > 10) {
        if (validPhone) {
          setErrPhone("Το κινητό σας τηλέφωνο θα πρέπει να έχει 10 ψηφία.");
        } else {
          setErrPhone(
            "Το κινητό σας τηλέφωνο δε μπορεί να περιέχει χαρακτήρες."
          );
        }
      } else {
        if (validPhone) {
          setErrPhone("");
        } else {
          setErrPhone(
            "Το κινητό σας τηλέφωνο δε μπορεί να περιέχει χαρακτήρες."
          );
        }
      }
    } else {
      setErrPhone("");
    }
  };

  const ValidateAMKA = (amka) => {
    let validAmka = /^\d+$/.test(amka);

    if (amka.length > 0) {
      if (amka.length < 11 || amka.length > 11) {
        if (validAmka) {
          setErrAMKA("Το ΑΜΚΑ σας θα πρέπει να έχει 11 ψηφία.");
        } else {
          setErrAMKA("Το ΑΜΚΑ σας δε μπορεί να περιέχει χαρακτήρες.");
        }
      } else {
        if (validAmka) {
          setErrAMKA("");
        } else {
          setErrAMKA("Το ΑΜΚΑ σας δε μπορεί να περιέχει χαρακτήρες.");
        }
      }
    } else {
      setErrAMKA("");
    }
  };

  const ValidateAFM = (afm) => {
    let validafm = /^\d+$/.test(afm);

    if (afm.length > 0) {
      if (afm.length < 9 || afm.length > 9) {
        if (validafm) {
          setErrAFM("Το ΑΦΜ σας θα πρέπει να έχει 9 ψηφία.");
        } else {
          setErrAFM("Το ΑΦΜ σας δε μπορεί να περιέχει χαρακτήρες.");
        }
      } else {
        if (validafm) {
          setErrAFM("");
        } else {
          setErrAFM("Το ΑΦΜ σας δε μπορεί να περιέχει χαρακτήρες.");
        }
      }
    } else {
      setErrAFM("");
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
                  onInput={(e) => ValidateAMKA(e.target.value)}
                  onChange={(e) =>
                    setUserData((userData) => ({
                      ...userData,
                      AMKA: e.target.value,
                    }))
                  }
                />
                {errAMKA ? <ErrorMsg ErrorMsg={errAMKA} /> : null}
              </div>
              <div className="col-sm-12 col-lg-4 mt-4">
                <label className="label">ΑΦΜ</label>
                <input
                  type="text"
                  className="inputValues"
                  value={userData.AFM}
                  onInput={(e) => ValidateAFM(e.target.value)}
                  onChange={(e) =>
                    setUserData((userData) => ({
                      ...userData,
                      AFM: e.target.value,
                    }))
                  }
                />
                {errAFM ? <ErrorMsg ErrorMsg={errAFM} /> : null}
              </div>
              <div className="col-sm-12 col-lg-4 mt-4">
                <label className="label">Κινητό</label>
                <input
                  type="text"
                  className="inputValues"
                  value={userData.phone}
                  onInput={(e) => ValidatePhone(e.target.value)}
                  onChange={(e) =>
                    setUserData((userData) => ({
                      ...userData,
                      phone: e.target.value,
                    }))
                  }
                />
                {errPhone ? <ErrorMsg ErrorMsg={errPhone} /> : null}
              </div>
            </div>
            <div className="d-flex">
              <div className="mt-4">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={FormHandler}
                  disabled={
                    btnLoading
                      ? true
                      : false || errPhone !== ""
                      ? true
                      : false || errAMKA !== ""
                      ? true
                      : false || errAFM !== ""
                      ? true
                      : false || errFirstName !== ""
                      ? true
                      : false || errLastName !== ""
                      ? true
                      : false || loggedInUser === "test@gmail.com"
                      ? true
                      : false
                  }
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
              <Modal.Title>Όροι κ' Προϋποθέσεις</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h3>
                <strong>Γενικά</strong>
              </h3>

              <p>Καλως Ήρθατε στη Medrchive!</p>

              <p>
                Αυτοί οι όροι και προϋποθέσεις περιγράφουν τους κανονισμούς για
                τη χρήση της εφαρμογής Medrchive, που βρίσκεται στη παρακάτω
                ηλεκτρονική διεύθυνση: www.medrchive.gr
              </p>

              <p>
                Έχοντας πρόσβαση σε αυτήν την εφαρμογή, υποθέτουμε ότι
                αποδέχεστε τους όρους και τις προϋποθέσεις. Δεν μπορείτε να
                συνεχίσετε στη Medrchive εάν δεν συμφωνείτε με όλα όσα είναι
                δηλωμένα σε αυτή τη σελίδα.
              </p>

              <p>
                Η παρακάτω ορολογία ισχύει σε αυτούς τους όρους και
                προϋποθέσεις, Δήλωση απορρήτου και σημείωση αποποίησης ευθύνης
                και όλες τις Συμφωνίες: "Πελάτης", "Εσείς" και "Δικό σας"
                αναφέρεται σε εσάς, στό άτομο που επισκέπτεται την εφαρμογή και
                συμφωνεί στους όρους και προϋποθέσεις της εταιρίας. "Η εταιρία",
                "Εμεις", "Δικό μας" είναι εκφράσεις που αναφέρονται σε εμάς, την
                εταιρία. Όλοι οι όροι αναφέρονται στη προσφορά, αποδοχή και
                θεώρηση όλων των μέτρων που πρέπει να ληφθούν με τον
                καταλληλότερο τρόπο, για να εκφράσουμε τις ανάγκες σας σε
                συνδυασμό με τις υπηρεσίες της εταιρίας που είναι σύμφωνες με
                τους νόμους της Ελλάδας.
              </p>

              <h3>
                <strong>Cookies</strong>
              </h3>

              <p>
                Η εφαρμογή κάνει χρήση cookies. Έχοντας πρόσβαση στην εφαρογή
                Medrchive, συφωνείτε στη χρήση των cookies που είναι σύμφωνα με
                την πολιτική της εταιρίας.
              </p>

              <p>
                Θεωρούμε σημαντικό να ξέρετε ποια είναι τα cookies που
                χρησιμοποιούνται στην ιστοσελίδα-εφαρμογή μας και για ποιούς
                λόγους αυτά χρησιμοποιούνται. Στόχος μας είναι η σωστή ενημέρωση
                και προστασία σας αλλά και η καλύτερη εμπειρία από την επίσκεψη
                σας στην εφαρμογή μας. Έτσι χρησιμοποιούμε cookies για την
                καλύτερη δυνατή λειτουργίας της, τη σωστή περιήγηση σας, τη
                σύνδεση και τη μετακίνηση στις σελίδες καθώς και για την παροχή
                διαφημιστικού περιεχομένου βασιζόμενο στα ενδιαφέροντα και τις
                ανάγκες σας (Μελλοντικά).
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
                  λήγει ποτέ, ανανεώνεται κάθε φορά που ο χρήστης κάνει Σύνδεση
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

              <h3>
                <strong>Άδεια</strong>
              </h3>

              <p>
                Εκτός αν δηλωθεί, η Medrchive ή/και δικαιοπάροχοι κατέχουν την
                πνευματική ιδιοκτησία για όλη την Medrchive.
              </p>

              <p>Δεν επιτρέπεται:</p>
              <ul>
                <li>Να αναπαράγετε ή να αντιγράψετε υλικό από τη Medrchive</li>
                <li>Να πουλήσετε ή να νοικιάσετε οτιδήποτε από τη Medrchive</li>
                <li>Η διανομή από τη Medrchive</li>
              </ul>

              <p>
                Μερικά μέρη της εφαρμογής προσφέρουν την ευκαιρία στους χρήστες
                να ανεβάσουν και να αποθηκεύσουν πληροφορίες. Η Medrchive δεν
                επεξεργάζετε, τροποποιεί, δημοσιεύει η βλέπει τις πληροφορίες
                αυτές. Η εφαρμογή της Medrchive αποθηκεύει τα αρχεία της στη
                Firestore και δεν ευθύνεται για οποιαδήποτε χρήση των αρχείων
                κάνει η Google.Για περισσότερες πληροφορίες επισκευτείτe τη
                σελίδα της{" "}
                <a
                  href="https://firebase.google.com/products/firestore?gclid=CjwKCAiAhreNBhAYEiwAFGGKPIq8NZJE8Ro0r8Hf6iOsiPi9eX_sKxrjmgYlLmgsfTQ5uU9bnD2IeRoCptsQAvD_BwE&gclsrc=aw.ds"
                  target="_blank"
                >
                  Firestore
                </a>
                . Η Medrchive δεν έχει καμία ευθύνη για τη καταστροφή, διαγραφή
                ή την υποκλοπή των δεδομένων αυτών.
              </p>

              <p>
                Η Medrchive έχει το δικαίωμα να παρακολουθεί και να διαγράφει
                ότι η εταιρία θεωρήσει ότι παραβιάσει τους όρους και τις
                προϋποθέσεις ή είναι ακατάλληλο.
              </p>

              <p>Εσείς εγγυάστε και εκποροσωπείτε:</p>

              <ul>
                <li>
                  Είστε υπεύθυνος για όλες τις καταχωρήσεις, καθώς και τα σχόλια
                  που ανεβάζετε στην εφαρογή.
                </li>
                <li>
                  Τα σχόλια των καταχωρήσεων δεν περιέχουν προσβλητικό
                  περιεχόμενο, καθώς αυτό θα ήταν παραβίαση των όρων και θα
                  μπορούσε να οδηγήσει σε διαγραφή του λογαριασού σας.
                </li>

                <li>
                  Τα σχόλια σας δεν θα χρησιμοποιηθούν για να προάγουν
                  διαφημιστικό περιεχόμενο, ούτε παράνομη δραστηριότητα.
                </li>
              </ul>

              <h3>
                <strong>Σύνδεση στο περιεχόμενό μας</strong>
              </h3>

              <p>
                Οι παρακάτω οργανισμού μπορεί να συνδεθούν στην εφαρμογή μας
                χωρίς γραπτή άδεια.
              </p>

              <ul>
                <li>Υπηρεσίες της κυβέρνησης</li>
                <li>Μηχανές αναζήτησης</li>

                <li>Διαδικτυακοι διανομείς</li>
                <li>Μη κερδοσκοπικοί οργανισμοί</li>
              </ul>

              <p>
                Οι παραπάνω μπορούν να συνδεθούν στην εφαρμογή μας εφόσον: (α)
                δεν είναι παραπλανητικοί, (β) δεν προάγουν ψεύτικες εγγυήσεις,
                (γ) συμφωνούν με τους όρους όχι μόνο της εταιρίας, αλλά και των
                χρηστών.
              </p>

              <p>
                Ενδεχομένος να δεχτούμε και συνδέσεις από τους παρακάτω
                οργανισμούς:
              </p>

              <ul>
                <li>Γνωστούς καταναλωτές ή/και ενημερωτικές πηγές</li>

                <li>Οργανισμούς που αντιπροσωπεύουν φιλανθρωπίες</li>
                <li>Διαδικτυακές Πύλες</li>
                <li>Λογιστικές και Νομικές Εταιρίες</li>
                <li>Πανεπιστήμια</li>
              </ul>

              <p>
                Θα δεχτούμε τις συνδέσεις αυτές εάν: (α) δεν μας κάνει να
                φαινόμαστε αναξιόπιστοι, (β) η εταιρία δεν έχει αρνητικό
                αντίκτυπο, (γ) Προωθηθούμε.
              </p>

              <h3>
                <strong>iFrames</strong>
              </h3>

              <p>
                Χωρίς την γραπτή άδεια μας, δεν μπορείτε να δημιουργήσετε frames
                στην εφαρμογή που μπορεί να επηρεάσουν την οπτική εικόνα και την
                παρουσίαση της εφαρμογής.
              </p>

              <h3>
                <strong>Ευθύνη Περιεχομένου</strong>
              </h3>

              <p>
                Δεν είμαστε υπεύθυνοι για ότι περιεχόενο εμφαρνιστεί στην
                ιστοσελίδα - εφαρογή σας. Συφωνείτε να μας υπερασπιστείτε για
                όλους τους ισχυρισμούς που μπορεί να προκύψουν.
              </p>

              <h3>
                <strong>Το απόρρητό σας</strong>
              </h3>

              <p>Παρακαλώ διαβάστε το απόρρητό σας</p>

              <h3>
                <strong>Επιφύλαξη Δικαιωμάτων</strong>
              </h3>

              <p>
                Σας αφαιρείται το δικαίωμα να ζητήσετε την αφαίρεση οποιουδήποτε
                link ή διαφήμισης στην εφαρμογή μας. Επίσης συναινείτε να
                αφαιρέσετε οποιοδήποτε link προσθέσετε χωρίς άδεια. Επίσης
                έχουμε το δικαίωμα να αλλάξουμε τους όρους και τις προϋποθέσεις
                οποιαδήποτε στιγμή χωρίς ενημέρωση. Με την είσοδο σας στην
                εφαρμογή, συμφωνείτε στους υπάρχοντες όρους, κανόνες και
                προϋποθέσεις.
              </p>

              <h3>
                <strong>Αφαίρεση Υλικού από την εφαρμογή</strong>
              </h3>

              <p>
                Εάν βρείτε κάτι προσβλητικό στην εφαρογή μας για οποιοδήποτε
                λόγο, μπορείτε να επικοινωνήσετε μαζί μας οποιαδήποτε στιγμή. Θα
                εξετάσουμε το αίτημά σας και θα σας απαντήσουμε, αλλά δεν
                είμαστε υποχρεωμένοι να συμμορφωθούμε με αυτό.
              </p>

              <p>
                Δεν σας διαβεβαιώνουμε ότι οι πληροφορίες σε αυτή την εφαρμογή
                είναι σωστές, ούτε για την αρκίβειά τους. Επίσης δεν σας
                διαβεβαιώνουμε ότι η ιστοσελίδα - εφαρμογή θα μένει διαθέσιμη
                αλλά και αναβαθμισμένη συνέχεια.
              </p>

              <h3>
                <strong>Αποποίηση ευθυνών</strong>
              </h3>

              <p>Δεν έχουμε καμία ευθύνη για τα παρακάτω:</p>

              <ul>
                <li>Τραυματισμό, θανατηφόρο ή μη.</li>
                <li>Για οποιαδήποτε απάτη, ή υποκλοπή πληροφοριών</li>
              </ul>

              <p>
                Όσο λειτουργεί η ιστοσελίδα - εφαρμογή, δεν έχουμε καμία ευθύνη
                για οποιαδήποτε κλοπή, απάτη κτλπ οποιασδήποτε φύσεως.
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
                disabled={
                  emailStatus
                    ? true
                    : false || loggedInUser === "test@gmail.com"
                    ? true
                    : false
                }
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
                disabled={
                  deleteReqStatus
                    ? true
                    : false || loggedInUser === "test@gmail.com"
                    ? true
                    : false
                }
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
