import { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../utils/firebase";
// modals
import { Modal } from "react-bootstrap";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // modals
  const [ErrorModal, setErrorModal] = useState(false);
  const handleCloseError = () => setErrorModal(false);
  const handleOpenError = () => setErrorModal(true);

  const FormHandler = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        // const userCred = userCredential.user;
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        handleOpenError();
      });
  };

  return (
    <div className="pt-5 mt-5 form-cumstom-tab">
      <label className="label">Email</label>
      <input
        type="email"
        className="inputValues"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="label mt-4">Κωδικός</label>
      <input
        type="password"
        className="inputValues"
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="mt-5 mb-2">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={FormHandler}
          value={password}
          disabled={loading ? true : false}
        >
          {loading && (
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
            ></span>
          )}
          <span>{loading ? "Περιμένετε..." : "Είσοδος"}</span>
        </button>
      </div>
      {/* error modal */}
      <Modal show={ErrorModal} onHide={handleOpenError}>
        <Modal.Header>
          <Modal.Title>Αποτυχία Σύνδεσης</Modal.Title>
        </Modal.Header>
        <Modal.Body>Ο κωδικός χρήστη ή το email σας είναι λάθος.</Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleCloseError}
          >
            Κλείσιμο
          </button>
        </Modal.Footer>
      </Modal>
      {/* end of error modal */}
    </div>
  );
};

export default LoginForm;
