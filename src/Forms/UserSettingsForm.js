import { useState, useEffect } from "react";
import ErrorMsg from "../general/ErrorMsg";
// firestore
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../utils/firebase";
import FullScreenLoader from "../general/FullScreenLoader";
// font icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
// modals
import { Modal } from "react-bootstrap";

const UserSettingsForm = (props) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const [btnLoading, setBtnLoading] = useState(false);
  const [errFirstName, setErrFirstName] = useState("");
  const [errLastName, setErrLastName] = useState("");

  const loggedInUser = props.loggedInUser;

  // modals
  const [showInfo, setShowInfo] = useState(false);
  const handleCloseInfo = () => setShowInfo(false);
  const handleOpenInfo = () => setShowInfo(true);

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleOpenDelete = () => setShowDelete(true);

  const fetchUserData = async () => {
    const docRef = doc(db, "users", loggedInUser);
    const docSnap = await getDoc(docRef);
    setUserData(docSnap.data());
  };

  useEffect(() => {
    setLoading(true);
    fetchUserData().finally(
      setTimeout(function () {
        setLoading(false);
      }, 300)
    );

    setUserData((userData) => ({
      ...userData,
      accModifications: Timestamp.fromDate(new Date()),
    }));
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
    } else {
      alert("fORM ERROR");
    }

    setTimeout(function () {
      setBtnLoading(false);
    }, 300);
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

          <div className="p-4 mt-5 form-custom">
            <u>
              <h6>Όροι,Προϋποθέσεις κ' Cookies εφαρμογής:</h6>
            </u>
            <div className="d-flex" id="TermsInfoUserDataBtn">
              <div className="mt-3">
                <b>Εμφάνιση των όρων και των προϋποθέσεων της εφαρμογής:</b>
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
          <div className="p-4 mt-5 form-custom">
            <u>
              <h6>Διαχείριση Λογαριασμού:</h6>
            </u>
            <div className="d-flex" id="deleteUserDataBtn">
              <div className="mt-3">
                <b>Διαγραφή όλων των δεδομένων μου από την εφαρμογή:</b>
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
          {/* info modal */}
          <Modal show={showInfo} onHide={handleCloseInfo}>
            <Modal.Header>
              <Modal.Title>Όροι,Προϋποθέσεις κ' Cookies</Modal.Title>
            </Modal.Header>
            <Modal.Body>Terms n Conditions</Modal.Body>
            <Modal.Body>Cookies</Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseInfo}
              >
                Κλείσιμο
              </button>
            </Modal.Footer>
          </Modal>
          {/* end of info modal modal */}

          {/* delete all data modal */}
          <Modal show={showDelete} onHide={handleCloseDelete}>
            <Modal.Header>
              <Modal.Title>Διαγραφή Δεδομένων</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Είστε σίγουροι ότι θέλετε να διαγράψετε όλα σας τα καταχωρημένα
              δεδομένα; (Μετρήσεις ζωτικών λειτουργιών και PDF).
            </Modal.Body>
            <Modal.Body>
              <b>
                Αυτή η πράξη <u>ΔΕΝ</u> μπορεί να αντιστραφεί.
              </b>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="btn btn-danger"
                // onClick={deleteMeetingHandler}
              >
                Διαγραφή
              </button>
              <button
                type="button"
                className="btn btn-secondary"
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
