import { useState, useEffect } from "react";

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

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const ismobile = window.innerWidth < 1000;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
  }, [isMobile]);

  const FormHandler = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="pt-5 mb-4 form-custom">
      <div className="row">
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Όνομα</label>
          <input
            type="text"
            className="inputValues"
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
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Κωδικός</label>
          <input
            type="password"
            className="inputValues"
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
            onChange={(e) => setPasswordVerif(e.target.value)}
          />
        </div>
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">ΑΜΚΑ (Προαιρετικό)</label>
          <input
            type="text"
            className="inputValues"
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
            onChange={(e) => setAFM(e.target.value)}
          />
        </div>
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Κινητό (Προαιρετικό)</label>
          <input
            type="text"
            className="inputValues"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-3 mb-4">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={(e) => setConditions(e.target.value)}
          />
          <label style={{ fontSize: "12px" }}>
            Συμφωνώ με τους όρους χρήσης και τις προϋποθέσεις
          </label>
        </div>
        <div className="mt-4">
          <button
            type="button"
            className={
              isMobile
                ? "btn btn-outline-primary w-100"
                : "btn btn-outline-primary w-25"
            }
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
