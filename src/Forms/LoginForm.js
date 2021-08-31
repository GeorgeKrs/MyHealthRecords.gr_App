import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const FormHandler = () => {
    console.log(email);
    console.log(password);

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="pt-5 d-flex flex-column mb-4 form-custom">
      <label className="label">Email</label>
      <input
        type="email"
        className="inputValues"
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
          <span>{loading ? "Περιμένετε..." : "Είσοδος"}</span>
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
