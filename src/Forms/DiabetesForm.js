import { useState } from "react";
import ErrorMsg from "../general/ErrorMsg";
// modals
import { Modal } from "react-bootstrap";
// firebase
import { db } from "../utils/firebase";
import { addDoc, Timestamp, collection } from "firebase/firestore";

const DiabetesForm = (props) => {
  const userEmail = props.loggedInUser;

  const [loading, setLoading] = useState(false);

  const [sugar, setSugar] = useState("");
  const [category, setCategory] = useState("beforeMeal");
  const [comments, setComments] = useState("");
  const [errSugar, setErrSugar] = useState("");

  //  modals
  const [showError, setShowError] = useState(false);
  const handleCloseError = () => setShowError(false);
  const handleOpenError = () => setShowError(true);

  const [showSuccess, setShowSuccess] = useState(false);
  const handleCloseSuccess = () => setShowSuccess(false);
  const handleOpenSuccess = () => setShowSuccess(true);

  const ValidateSugar = (sugar) => {
    if ((sugar < 50 || sugar > 220) && sugar !== "") {
      setErrSugar("Τιμή εκτός ορίων. 50 < Σάκχαρο < 160.");
    } else {
      setErrSugar("");
    }
  };

  const FormHandler = () => {
    setLoading(true);
    if (sugar === "" || errSugar !== "") {
      handleOpenError();
    } else {
      (async () => {
        await addDoc(collection(db, "bloodSugarRecords"), {
          userEmail: userEmail,
          bloodSugar: sugar,
          category: category,
          comments: comments,
          submitDate: Timestamp.fromDate(new Date()),
        });
      })().finally(handleOpenSuccess());
      setSugar("");
      setCategory("beforeMeal");
      setComments("");
    }
    setLoading(false);
  };

  return (
    <div className="pt-4 mb-4">
      <div className="form-custom">
        <div className="row">
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Τιμή Σακχάρου</label>
            <input
              type="number"
              className="inputValues"
              onChange={(e) => setSugar(e.target.value)}
              onInput={(e) => ValidateSugar(e.target.value)}
              disabled={loading ? true : false}
              value={sugar}
            />
            {errSugar ? <ErrorMsg ErrorMsg={errSugar}></ErrorMsg> : null}
          </div>
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Κατηγορία</label>
            <select
              className="inputValues"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              disabled={loading ? true : false}
            >
              <option defaultValue value="beforeMeal">
                Πριν το φαγητό
              </option>
              <option value="afterMeal">Μετά το φαγητό</option>
              <option value="beforeBed">Πριν τον ύπνο</option>
              <option value="other">Άλλο</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-lg-12 mt-4">
            <label className="label">Σχόλια Μέτρησης:</label>
            <textarea
              className="inputValues"
              rows="3"
              onChange={(e) => setComments(e.target.value)}
              disabled={loading ? true : false}
              value={comments}
            />
          </div>
        </div>

        <div className="mt-5">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={FormHandler}
            disabled={loading ? true : false}
          >
            {loading ? "Περιμένετε" : "Καταχώρηση"}
          </button>
        </div>
      </div>
      {/* error modal */}
      <Modal show={showError} onHide={handleCloseError}>
        <Modal.Header>
          <Modal.Title>Αποτυχία Καταχώρησης</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Παρακαλώ συμπληρώστε το πεδίο του σάκχαρου με βάση τους περιορισμούς.
        </Modal.Body>
        <Modal.Body>
          Άδειες καταχωρήσεις και καταχωρήσεις μόνο με σχόλια δεν γίνονται
          δεκτές.
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleCloseError}
          >
            Επιστροφή
          </button>
        </Modal.Footer>
      </Modal>
      {/* end of error modal */}

      {/* success modal */}
      <Modal show={showSuccess} onHide={handleCloseSuccess}>
        <Modal.Header>
          <Modal.Title>Επιτυχία Καταχώρησης</Modal.Title>
        </Modal.Header>
        <Modal.Body>Η φόρμα καταχωρήθηκε με επιτυχία.</Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleCloseSuccess}
          >
            Κλείσιμο
          </button>
        </Modal.Footer>
      </Modal>
      {/* end of success modal */}
    </div>
  );
};

export default DiabetesForm;
