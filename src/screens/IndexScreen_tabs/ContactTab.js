const ContactTab = () => {
  return (
    <div className="pt-5 mt-5 form-cumstom-tab">
      <div className="row">
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Όνομα</label>
          <input type="text" className="inputValues" onChange={{}} />
        </div>
        <div className="col-sm-12 col-lg-6 mt-4">
          <label className="label">Επώνυμο</label>
          <input type="text" className="inputValues" onChange={{}} />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-lg-12 mt-4">
          <label className="label">Email</label>
          <input type="email" className="inputValues" onChange={{}} />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-lg-12 mt-4">
          <label className="label">Μήνυμα</label>
          <textarea className="inputValues" rows="4" onChange={{}}></textarea>
        </div>
      </div>

      <div className="mt-5">
        <button
          type="button"
          className="btn btn-outline-danger"
          //   onClick={FormHandler}
          //   disabled={loading ? true : false}
        >
          {/* {loading && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
              )}
              <span>{loading ? "Περιμένετε..." : "Καταχώρηση"}</span> */}
          Αποστολή
        </button>
      </div>
    </div>
  );
};

export default ContactTab;
