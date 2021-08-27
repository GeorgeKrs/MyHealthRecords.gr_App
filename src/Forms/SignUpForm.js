const SignUpForm = () => {
  return (
    <div className="pt-5 mb-4">
      <div className="row">
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Όνομα</label>
          <input type="text" className="inputValues"></input>
        </div>
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Επώνυμο</label>
          <input type="text" className="inputValues"></input>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Email</label>
          <input type="email" className="inputValues"></input>
        </div>
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Κωδικός</label>
          <input type="password" className="inputValues"></input>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">ΑΜΚΑ (Προαιρετικό)</label>
          <input type="text" className="inputValues"></input>
        </div>
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">ΑΦΜ (Προαιρετικό)</label>
          <input type="text" className="inputValues"></input>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Κινητό (Προαιρετικό)</label>
          <input type="text" className="inputValues"></input>
        </div>
      </div>

      <div className="mt-5">
        <button type="button" className="btn btn-outline-primary">
          Εγγραφή
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
