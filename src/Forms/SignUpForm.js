import { useState, useEffect } from "react";
import ErrorMsg from "../general/ErrorMsg";
// firebase
import { auth, db, createUserWithEmailAndPassword } from "../utils/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
// modal
import { Modal } from "react-bootstrap";

const SignUpForm = () => {
  const [form, setForm] = useState([
    { email: "" },
    { firstName: "" },
    { lastName: "" },
    { password: "" },
    { passwordVerif: "" },
    { AMKA: "" },
    { AFM: "" },
    { phone: "" },
    { conditions: false },
  ]);

  const [errors, setError] = useState([
    { erEmail: "" },
    { erFirstName: "" },
    { erLastName: "" },
    { erPassword: "" },
    { erConditions: "" },
  ]);

  const [loading, setLoading] = useState(false);

  // error signing in modal
  const [showErrorModal, setShowErrorModal] = useState(false);
  const handleCloseErrorModal = () => setShowErrorModal(false);
  const handleOpenErrorModal = () => setShowErrorModal(true);

  // email exists modal
  const [showEmailExists, setShowEmailExists] = useState(false);
  const handleCloseEmailExists = () => setShowEmailExists(false);
  const handleOpenEmailExists = () => setShowEmailExists(true);

  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    if (form.firstName !== undefined) {
      if (form.firstName.length < 4) {
        setError((errors) => ({
          ...errors,
          erFirstName:
            "Το όνομα δε μπορεί να έχει λιγότερους από 4 χαρακτήρες.",
        }));
      } else {
        setError((errors) => ({
          ...errors,
          erFirstName: "",
        }));
      }
    }

    if (form.lastName !== undefined) {
      if (form.lastName.length < 4) {
        setError((errors) => ({
          ...errors,
          erLastName:
            "Το επώνυμο δε μπορεί να έχει λιγότερους από 4 χαρακτήρες.",
        }));
      } else {
        setError((errors) => ({
          ...errors,
          erLastName: "",
        }));
      }
    }

    if (form.email !== undefined) {
      let emailValidation = re.test(String(form.email).toLowerCase());
      if (!emailValidation) {
        setError((errors) => ({
          ...errors,
          erEmail: "Μη έγκυρο email.",
        }));
      } else {
        setError((errors) => ({
          ...errors,
          erEmail: "",
        }));
      }
    }

    if (form.password !== undefined || form.passwordVerif !== undefined) {
      if (
        form.password !== form.passwordVerif ||
        form.password === 0 ||
        form.password < 4
      ) {
        setError((errors) => ({
          ...errors,
          erPassword: "Λανθασμένος κωδικός.",
        }));
      } else {
        setError((errors) => ({
          ...errors,
          erPassword: "",
        }));
      }
    }

    if (!form.conditions || form.conditions === undefined) {
      setError((errors) => ({
        ...errors,
        erConditions: "Πρέπει να αποδεχτείτε τους όρους & προϋποθέσεις.",
      }));
    } else {
      setError((errors) => ({
        ...errors,
        erConditions: "",
      }));
    }
  }, [form]);

  const FormHandler = () => {
    setLoading(true);

    let isValid = false;
    if (
      errors.erEmail !== "" ||
      errors.erFirstName !== "" ||
      errors.erLastName !== "" ||
      errors.erPassword !== "" ||
      errors.erConditions !== ""
    ) {
      handleOpenErrorModal();
      isValid = false;
    } else {
      isValid = true;
      if (form.AMKA === undefined) {
        form.AMKA = "";
      }
      if (form.AFM === undefined) {
        form.AFM = "";
      }
      if (form.phone === undefined) {
        form.phone = "";
      }
    }

    if (isValid) {
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then((userCredential) => {
          setLoading(false);
          const userCred = userCredential.user;
          (async () => {
            await setDoc(doc(db, "users", form.email), {
              uuid: userCred.uid,
              email: form.email,
              password: form.password,
              firstName: form.firstName,
              lastName: form.lastName,
              AMKA: form.AMKA,
              AFM: form.AFM,
              phone: form.phone,
              conditions: true,
              validAcc: false,
              userLevel: "patient",
              signUpDate: Timestamp.fromDate(new Date()),
              accModifications: Timestamp.fromDate(new Date()),
            });
          })();
          (async () => {
            await setDoc(doc(db, "allergiesRecords", form.email), {
              food_allergies: false,
              food_comments: "",
              breathe_allergies: false,
              breathe_comments: "",
              skin_allergies: false,
              skin_comments: "",
              sting_allergies: false,
              sting_comments: "",
              drug_allergies: false,
              drug_comments: "",
              other_allergies: false,
              other_comments: "",
              LastModification: Timestamp.fromDate(new Date()),
            });
          })();
        })
        .catch((error) => {
          setLoading(false);
          handleOpenEmailExists();
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="pt-5 mt-1 form-cumstom-tab">
      <div className="row">
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Όνομα</label>
          <input
            type="text"
            className="inputValues"
            onChange={(e) =>
              setForm((form) => ({ ...form, firstName: e.target.value }))
            }
          />
          {errors.erFirstName ? (
            <ErrorMsg ErrorMsg={errors.erFirstName}></ErrorMsg>
          ) : null}
        </div>
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Επώνυμο</label>
          <input
            type="text"
            className="inputValues"
            onChange={(e) =>
              setForm((form) => ({ ...form, lastName: e.target.value }))
            }
          />
          {errors.erLastName ? (
            <ErrorMsg ErrorMsg={errors.erLastName}></ErrorMsg>
          ) : null}
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Email</label>
          <input
            type="email"
            className="inputValues"
            onChange={(e) =>
              setForm((form) => ({ ...form, email: e.target.value }))
            }
          />
          {errors.erEmail ? (
            <ErrorMsg ErrorMsg={errors.erEmail}></ErrorMsg>
          ) : null}
        </div>
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Κωδικός</label>
          <input
            type="password"
            className="inputValues"
            onChange={(e) =>
              setForm((form) => ({ ...form, password: e.target.value }))
            }
          />
          {errors.erPassword ? (
            <ErrorMsg ErrorMsg={errors.erPassword}></ErrorMsg>
          ) : null}
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Κωδικός (Επαλήθευση)</label>
          <input
            type="password"
            className="inputValues"
            onChange={(e) =>
              setForm((form) => ({ ...form, passwordVerif: e.target.value }))
            }
          />
          {errors.erPassword ? (
            <ErrorMsg ErrorMsg={errors.erPassword}></ErrorMsg>
          ) : null}
        </div>
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">ΑΜΚΑ (Προαιρετικό)</label>
          <input
            type="text"
            className="inputValues"
            onChange={(e) =>
              setForm((form) => ({ ...form, AMKA: e.target.value }))
            }
          />
          {errors.erAMKA ? (
            <ErrorMsg ErrorMsg={errors.erAMKA}></ErrorMsg>
          ) : null}
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">ΑΦΜ (Προαιρετικό)</label>
          <input
            type="text"
            className="inputValues"
            onChange={(e) =>
              setForm((form) => ({ ...form, AFM: e.target.value }))
            }
          />
          {errors.erAFM ? <ErrorMsg ErrorMsg={errors.erAFM}></ErrorMsg> : null}
        </div>
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Κινητό (Προαιρετικό)</label>
          <input
            type="text"
            className="inputValues"
            onChange={(e) =>
              setForm((form) => ({ ...form, phone: e.target.value }))
            }
          />
          {errors.erPhone ? (
            <ErrorMsg ErrorMsg={errors.erPhone}></ErrorMsg>
          ) : null}
        </div>
      </div>

      <div className="mt-3 mb-4">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            defaultChecked={false}
            onChange={(e) =>
              setForm((form) => ({ ...form, conditions: e.target.checked }))
            }
          />
          <label style={{ fontSize: "12px" }}>
            Συμφωνώ με τους όρους χρήσης και τις προϋποθέσεις
          </label>
        </div>
        {errors.erConditions ? (
          <ErrorMsg ErrorMsg={errors.erConditions}></ErrorMsg>
        ) : null}
        <div className="mt-4">
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={FormHandler}
            disabled={loading ? true : false}
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
            )}
            <span>{loading ? "Περιμένετε..." : "Εγγραφή"}</span>
          </button>
        </div>
      </div>

      {/* no SignIn modal */}
      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header>
          <Modal.Title>Αποτυχία Εγγραφής</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία ακολουθώντας τους
          περιορισμούς.
        </Modal.Body>

        <Modal.Body>
          <ul className="list-group list-group-numbered">
            Υποχρεωτικά πεδία θεωρούνται τα παρακάτω:
            <li className="list-group-item mt-2">Όνομα</li>
            <li className="list-group-item">Επώνυμο</li>
            <li className="list-group-item">Email</li>
            <li className="list-group-item">Κωδικός</li>
            <li className="list-group-item">Όροι Χρήσης και προϋποθέσεις</li>
          </ul>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleCloseErrorModal}
          >
            Επιστροφή
          </button>
        </Modal.Footer>
      </Modal>
      {/* end of no SignIn modal */}

      {/* Email exists */}
      <Modal show={showEmailExists} onHide={handleCloseEmailExists}>
        <Modal.Header>
          <Modal.Title>Αποτυχία Εγγραφής</Modal.Title>
        </Modal.Header>

        <Modal.Body>Υπάρχει ήδη ένας λογαριασμός με αυτό το email.</Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleCloseEmailExists}
          >
            Επιστροφή
          </button>
        </Modal.Footer>
      </Modal>
      {/* end of Email exists modal */}
    </div>
  );
};

export default SignUpForm;
