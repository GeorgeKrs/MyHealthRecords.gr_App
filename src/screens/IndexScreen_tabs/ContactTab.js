import { useState } from "react";
import ErrorMsg from "../../general/ErrorMsg";

// firebase
import { db } from "../../utils/firebase";
import { addDoc, Timestamp, collection } from "firebase/firestore";

const ContactTab = () => {
  const [loading, setLoading] = useState(false);

  const [firstName, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [textArea, setTextArea] = useState("");

  const [error, setError] = useState("");

  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const FormHandler = () => {
    setLoading(true);

    const emailValidation = re.test(String(email).toLowerCase());
    if (
      !emailValidation ||
      textArea === "" ||
      textArea === undefined ||
      textArea === null
    ) {
      setError("Το email και το κείμενο δεν μπορούν να είναι κενά.");
      setLoading(false);
    } else {
      setError("");
      setLoading(false);
    }
  };

  return (
    <div className="pt-5 mt-5 form-cumstom-tab">
      <div className="row">
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Όνομα</label>
          <input
            type="text"
            className="inputValues"
            onChange={(e) => setName(e.target.value)}
            disabled={loading ? true : false}
          />
        </div>
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Επώνυμο</label>
          <input
            type="text"
            className="inputValues"
            onChange={(e) => setLastName(e.target.value)}
            disabled={loading ? true : false}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-lg-12 mt-4">
          <label className="label">Email</label>
          <input
            type="email"
            className="inputValues"
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading ? true : false}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-lg-12 mt-4">
          <label className="label">Μήνυμα</label>
          <textarea
            className="inputValues"
            rows="4"
            onChange={(e) => setTextArea(e.target.value)}
            disabled={loading ? true : false}
          ></textarea>
        </div>
      </div>

      <div className="mt-5 mb-3">
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={FormHandler}
          disabled={loading ? true : false}
        >
          {loading && (
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
            ></span>
          )}
          <span>{loading ? "Περιμένετε..." : "Αποστολή"}</span>
        </button>
      </div>
      {error ? <ErrorMsg ErrorMsg={error}></ErrorMsg> : null}
    </div>
  );
};

export default ContactTab;
