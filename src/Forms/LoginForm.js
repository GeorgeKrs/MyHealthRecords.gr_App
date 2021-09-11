import { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../utils/firebase";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const FormHandler = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        const userCred = userCredential.user;
        console.log(userCred);
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <div className="pt-5 mt-5 form-cumstom-tab">
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
          className="btn btn-outline-primary"
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
