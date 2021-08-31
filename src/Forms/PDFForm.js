import { useState, useEffect } from "react";
import "./form.css";
import DoctorsSpecs from "../general/DoctorsSpecs";

const PDFForm = () => {
  const [doctorSpec, setDoctorSpec] = useState("");
  const [file, setFile] = useState("");
  const [comments, setComments] = useState("");
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
    <div className="pt-5 mb-4">
      <div className="form-custom">
        <div className="row">
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Επιλογή Ειδικότητας</label>
            <select
              className="inputValues"
              onChange={(e) => setDoctorSpec(e.target.value)}
            >
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
              onChange={(e) => setFile(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-lg-12 mt-4">
            <label className="label">Σχόλια Μέτρησης:</label>
            <textarea
              className="inputValues"
              rows="4"
              onChange={(e) => setComments(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-5">
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
            <span>{loading ? "Περιμένετε..." : "Καταχώρηση"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFForm;
