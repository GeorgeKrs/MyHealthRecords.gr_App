import { useState } from "react";
import { auth, createUserWithEmailAndPassword } from "../utils/firebase";

const SignUpForm = () => {
  const [firstname, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerif, setPasswordVerif] = useState("");
  const [AMKA, setAMKA] = useState("");
  const [AFM, setAFM] = useState("");
  const [phone, setPhone] = useState("");

  const [conditions, setConditions] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setError] = useState([
    { erFirstName: false },
    { erLastName: false },
    { erEmail: false },
    { erPassword: false },
    { erPasswordVerif: false },
    { erAMKA: false },
    { erAFM: false },
    { erPhone: false },
    { erConditions: false },
  ]);

  const FormHandler = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValidation = re.test(String(email).toLowerCase());

    if (!emailValidation) {
      setError((errors) => ({
        ...errors,
        erEmail: true,
      }));
    }

    if (firstname.length === 0) {
      setError((errors) => ({
        ...errors,
        erFirstName: true,
      }));
    }

    if (lastname.length === 0) {
      setError((errors) => ({
        ...errors,
        erLastName: true,
      }));
    }

    if (password !== passwordVerif || password.length === 0) {
      setError((errors) => ({
        ...errors,
        erPassword: true,
      }));
    }

    if (AMKA.length !== 11) {
      setError((errors) => ({
        ...errors,
        erAMKA: true,
      }));
    }

    if (AFM.length !== 9) {
      setError((errors) => ({
        ...errors,
        erAFM: true,
      }));
    }

    if (phone.length !== 10) {
      setError((errors) => ({
        ...errors,
        erPhone: true,
      }));
    }

    if (!conditions) {
      setError((errors) => ({
        ...errors,
        erConditions: true,
      }));
    }

    console.log(errors);

    // setLoading(true);
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     setLoading(false);
    //     const userCred = userCredential.user;
    //     console.log(userCred);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode);
    //     console.log(errorMessage);
    //   });
    // console.log(firstname);
    // console.log(lastname);
    // console.log(email);
    // console.log(password);
    // console.log(passwordVerif);
    // console.log(AMKA);
    // console.log(AFM);
    // console.log(phone);
    // console.log(conditions);
  };

  return (
    <div className="pt-5 mb-4 form-custom">
      <div className="row">
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Όνομα</label>
          <input
            type="text"
            className="inputValues"
            value={firstname}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Επώνυμο</label>
          <input
            type="text"
            className="inputValues"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Email</label>
          <input
            type="email"
            className="inputValues"
            value={lastname}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Κωδικός</label>
          <input
            type="password"
            className="inputValues"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Κωδικός (Επαλήθευση)</label>
          <input
            type="password"
            className="inputValues"
            value={passwordVerif}
            onChange={(e) => setPasswordVerif(e.target.value)}
          />
        </div>
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">ΑΜΚΑ (Προαιρετικό)</label>
          <input
            type="text"
            className="inputValues"
            value={AMKA}
            onChange={(e) => setAMKA(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">ΑΦΜ (Προαιρετικό)</label>
          <input
            type="text"
            className="inputValues"
            value={AFM}
            onChange={(e) => setAFM(e.target.value)}
          />
        </div>
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Κινητό (Προαιρετικό)</label>
          <input
            type="text"
            className="inputValues"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-3 mb-4">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            defaultChecked={false}
            onChange={(e) => setConditions(!conditions)}
          />
          <label style={{ fontSize: "12px" }}>
            Συμφωνώ με τους όρους χρήσης και τις προϋποθέσεις
          </label>
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="btn btn-outline-primary w-100"
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
    </div>
  );
};

export default SignUpForm;
