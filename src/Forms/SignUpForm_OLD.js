import { useState, useEffect } from "react";
import ErrorMsg from "../general/ErrorMsg";
// firebase import
import { auth, createUserWithEmailAndPassword } from "../utils/firebase";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [firstname, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerif, setPasswordVerif] = useState("");
  const [AMKA, setAMKA] = useState("");
  const [AFM, setAFM] = useState("");
  const [phone, setPhone] = useState("");
  const [conditions, setConditions] = useState(false);

  const [errors, setError] = useState([
    { erEmail: "" },
    { erFirstName: "" },
    { erLastName: "" },
    { erPassword: "" },
    { erConditions: "" },
    { isValid: false },
  ]);

  const [loading, setLoading] = useState(false);

  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    if (firstname.length < 3) {
      console.log("< 3");
    } else {
      console.log("> 3");
    }
  }, [firstname]);

  const FormHandler = () => {
    setLoading(true);

    const emailValidation = re.test(String(email).toLowerCase());

    if (!emailValidation) {
      setError((errors) => ({
        ...errors,
        erEmail: "Μη έγκυρο email.",
        isValid: false,
      }));
    } else {
      setError((errors) => ({
        ...errors,
        erEmail: "",
        isValid: true,
      }));
    }

    if (firstname.trim().length < 4) {
      setError((errors) => ({
        ...errors,
        erFirstName: "Το όνομα δε μπορεί να έχει λιγότερους από 4 χαρακτήρες.",
        isValid: false,
      }));
    } else {
      setError((errors) => ({
        ...errors,
        erFirstName: "",
        isValid: true,
      }));
    }

    if (lastname.trim().length < 4) {
      setError((errors) => ({
        ...errors,
        erLastName: "Το επώνυμο δε μπορεί να έχει λιγότερους από 4 χαρακτήρες.",
        isValid: false,
      }));
    } else {
      setError((errors) => ({
        ...errors,
        erLastName: "",
        isValid: true,
      }));
    }

    if (
      password.trim() !== passwordVerif.trim() ||
      password.trim().length == 0 ||
      password.trim().length < 4
    ) {
      setError((errors) => ({
        ...errors,
        erPassword: "Λανθασμένος κωδικός.",
        isValid: false,
      }));
    } else {
      setError((errors) => ({
        ...errors,
        erPassword: "",
        isValid: true,
      }));
    }

    if (!conditions) {
      setError((errors) => ({
        ...errors,
        erConditions: "Πρέπει να αποδεχτείτε τους όρους & προϋποθέσεις.",
        isValid: false,
      }));
    } else {
      setError((errors) => ({
        ...errors,
        erConditions: "",
        isValid: true,
      }));
    }

    console.log(errors.isValid);
    if (errors.isValid === true) {
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
    } else {
      setLoading(false);
    }
    console.log(errors);
  };

  return (
    <div className="pt-5 mt-5 form-cumstom-tab">
      <div className="row">
        <div className="col-sm212 col-lg-6 mt-4">
          <label className="label">Όνομα</label>
          <input
            type="text"
            className="inputValues"
            value={firstname}
            onChange={(e) => setName(e.target.value)}
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
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={passwordVerif}
            onChange={(e) => setPasswordVerif(e.target.value)}
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
            value={AMKA}
            onChange={(e) => setAMKA(e.target.value)}
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
            value={AFM}
            onChange={(e) => setAFM(e.target.value)}
          />
          {errors.erAFM ? <ErrorMsg ErrorMsg={errors.erAFM}></ErrorMsg> : null}
        </div>
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Κινητό (Προαιρετικό)</label>
          <input
            type="text"
            className="inputValues"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            onChange={(e) => setConditions(!conditions)}
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
    </div>
  );
};

export default SignUpForm;
