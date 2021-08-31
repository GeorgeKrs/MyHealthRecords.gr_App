const LoginForm = () => {
  return (
    <div className="pt-5 d-flex flex-column mb-4 form-custom">
      <label className="label">Email</label>
      <input type="email" className="inputValues"></input>

      <label className="label mt-4">Κωδικός</label>
      <input type="password" className="inputValues"></input>

      <div className="mt-5 mb-2">
        <button type="button" className="btn btn-outline-primary">
          Είσοδος
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
