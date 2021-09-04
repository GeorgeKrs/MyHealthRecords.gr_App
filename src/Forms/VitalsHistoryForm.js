import { useState } from "react";
import { MONTHS, DAYS, YEARS } from "../general/DateFile";

const VitalsHistoryForm = () => {
  const [fromYear, setFromYear] = useState("");
  const [fromMonth, setFromMonth] = useState("");
  const [fromDay, setFromDay] = useState("");
  const [toYear, setToYear] = useState("");
  const [toMonth, setToMonth] = useState("");
  const [toDay, setToDay] = useState("");
  const [loading, setLoading] = useState(false);

  const [viewModal, setViewModal] = useState(false);

  const FormHandler = () => {
    setLoading(true);
    setViewModal(true);

    console.log(fromYear);
    console.log(fromMonth);
    console.log(fromDay);
    console.log(toYear);
    console.log(toMonth);
    console.log(toDay);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="pt-4  mb-4">
      <div className="form-custom">
        <div className="row">
          <h5>Από:</h5>

          <div className="col-sm-12 col-lg-4 mt-3">
            <label className="label">Ημέρα</label>
            <select
              className="inputValues"
              onChange={(e) => setFromDay(e.target.value)}
            >
              <option className="text-secondary">Επιλογή Ημέρας</option>
              {DAYS.map((listObj) => (
                <option key={listObj.day} value={listObj.day_value}>
                  {listObj.day}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-12 col-lg-4 mt-3">
            <label className="label">Μήνας</label>
            <select
              className="inputValues"
              onChange={(e) => setFromMonth(e.target.value)}
            >
              <option className="text-secondary">Επιλογή Μήνα</option>
              {MONTHS.map((listObj) => (
                <option key={listObj.month} value={listObj.month_value}>
                  {listObj.month}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-12 col-lg-4 mt-3">
            <label className="label">Έτος</label>
            <select
              className="inputValues"
              onChange={(e) => setFromYear(e.target.value)}
            >
              <option className="text-secondary">Επιλογή Χρονολογίας</option>
              {YEARS.map((listObj) => (
                <option key={listObj.year} value={listObj.year_value}>
                  {listObj.year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mt-5">
          <h5>Έως:</h5>
          <div className="col-sm-12 col-lg-4 mt-3">
            <label className="label">Ημέρα</label>
            <select
              className="inputValues"
              onChange={(e) => setToDay(e.target.value)}
            >
              <option className="text-secondary">Επιλογή Ημέρας</option>
              {DAYS.map((listObj) => (
                <option key={listObj.day} value={listObj.day_value}>
                  {listObj.day}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-12 col-lg-4 mt-3">
            <label className="label">Μήνας</label>
            <select
              className="inputValues"
              onChange={(e) => setToMonth(e.target.value)}
            >
              <option className="text-secondary">Επιλογή Μήνα</option>
              {MONTHS.map((listObj) => (
                <option key={listObj.month} value={listObj.month_value}>
                  {listObj.month}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-12 col-lg-4 mt-3">
            <label className="label">Έτος</label>
            <select
              className="inputValues"
              onChange={(e) => setToYear(e.target.value)}
            >
              <option className="text-secondary">Επιλογή Χρονολογίας</option>
              {YEARS.map((listObj) => (
                <option key={listObj.year} value={listObj.year_value}>
                  {listObj.year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5">
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
            <span>{loading ? "Περιμένετε..." : "Αναζήτηση"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VitalsHistoryForm;
