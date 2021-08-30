import DoctorsSpecs from "../general/DoctorsSpecs";

const PDFForm = () => {
  return (
    <div className="pt-5 mb-4">
      <form>
        <div className="row">
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Επιλογή Ειδικότητας</label>
            <select className="inputValues">
              <option>Ειδικότητες Ιατρών</option>

              {DoctorsSpecs.map((doctor, index) => (
                <option key={index} value={index}>
                  {doctor}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">PDF Αρχείο</label>
            <input
              type="file"
              accept="application/pdf"
              className="form-control inputValues"
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-lg-12 mt-4">
            <label className="label">Σχόλια Μέτρησης:</label>
            <textarea className="inputValues" rows="4"></textarea>
          </div>
        </div>

        <div className="mt-5">
          <button type="button" className="btn btn-outline-primary">
            Καταχώρηση
          </button>
        </div>
      </form>
    </div>
  );
};

export default PDFForm;
