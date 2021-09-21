import { useState, useEffect } from "react";
import { MONTHS, DAYS, YEARS } from "../general/DateFile";
import Tooltip from "../general/Tooltip";
// firestore
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

const VitalsHistoryForm = (props) => {
  const [fromYear, setFromYear] = useState("");
  const [fromMonth, setFromMonth] = useState("");
  const [fromDay, setFromDay] = useState("");
  const [toYear, setToYear] = useState("");
  const [toMonth, setToMonth] = useState("");
  const [toDay, setToDay] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchState, setSearchState] = useState(false);
  const [userData, setUserData] = useState({});

  const loggedInUser = props.loggedInUser;

  let userDataArray = [];

  const fetchRecordData = async () => {
    const vitalsRef = collection(db, "vitalsRecords");
    const vitalsQuery = query(
      vitalsRef,
      where("userEmail", "==", loggedInUser)
    );
    const querySnapshot = await getDocs(vitalsQuery);
    querySnapshot.forEach((doc) => {
      setUserData(doc.data());
      userDataArray.push(userData);
    });
    setSearchState(true);
    console.log(userDataArray);
    console.log(searchState);
  };

  const FormHandler = () => {
    setLoading(true);

    const DateFrom = [fromYear, fromMonth, fromDay];
    console.log(DateFrom.join("-"));

    const DateTo = [toYear, toMonth, toDay];
    console.log(DateTo.join("-"));

    fetchRecordData();

    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  return (
    <div className="pt-4 mb-4 d-flex flex-column align-items-center">
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
      {searchState
        ? userDataArray.map(
            (
              submitDate,
              diastolic,
              systolic,
              pulses,
              temperature,
              oxygen,
              sugar,
              weight,
              comments,
              index
            ) => (
              <div className="form-custom container mt-5" id={index}>
                <h3>{submitDate}</h3>
                <div className="row mt-4">
                  <div className="col-lg-3 col-sm-12">
                    <b>Συστολική Πίεση (mmHg):</b> {diastolic}
                  </div>
                  <div className="col-lg-3 col-sm-12">
                    <b>Διαστολική Πίεση (mmHg):</b> {systolic}
                  </div>
                  <div className="col-lg-3 col-sm-12">
                    <b>Παλμοί (bpm):</b> {pulses}
                  </div>
                  <div className="col-lg-3 col-sm-12">
                    <b>Θερμοκρασία (&#176;C):</b> {temperature}
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-3 col-sm-12">
                    <b>Οξυγόνο (%):</b> {oxygen}
                  </div>
                  <div className="col-lg-3 col-sm-12">
                    <b>Σάκχαρο (mg/dL):</b> {sugar}
                  </div>
                  <div className="col-lg-3 col-sm-12">
                    <b>Βάρος (Κιλά):</b> {weight}
                  </div>
                  <div className="col-lg-3 col-sm-12"></div>
                </div>
                <div className="row">
                  <div
                    className="col-lg-12 col-sm-12 py-4 comments-div"
                    style={{ maxHeight: "300px" }}
                  >
                    <p>
                      <b>
                        Σχόλια:<br></br>
                      </b>
                      {comments}
                    </p>
                  </div>
                </div>
              </div>
            )
          )
        : null}
    </div>
  );
};

export default VitalsHistoryForm;
