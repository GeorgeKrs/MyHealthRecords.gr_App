const IndexScreen = () => {
  return (
    <div className="outer-indexdiv">
      <div className="container">
        <div className="d-flex bd-highlight mb-3">
          <div className="me-auto p-3 bd-highlight">APP LOGO</div>
          <div className="p-3 bd-highlight">
            <button className="btn btn-outline-danger">Επικοινωνία</button>
          </div>
          <div className="p-3 bd-highlight">
            <button className="btn btn-outline-success">Σχετικά με εμάς</button>
          </div>
          <div className="p-3 bd-highlight">
            <button className="btn btn-outline-primary">
              Είσοδος ή Εγγραφή
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexScreen;
