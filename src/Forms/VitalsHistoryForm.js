import { useEffect, useState } from "react";
import { MONTHS, DAYS, YEARS } from "../general/DateFile";
import FullScreenLoader from "../general/FullScreenLoader";
// firestore
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  startAfter,
  endAt,
  startAt,
} from "firebase/firestore";
import { db } from "../utils/firebase";
// font icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faAngleDoubleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const VitalsHistoryForm = (props) => {
  const [fromYear, setFromYear] = useState(new Date().getFullYear().toString());
  const [fromMonth, setFromMonth] = useState(
    (new Date().getMonth() + 1).toString()
  );
  const [fromDay, setFromDay] = useState((new Date().getDate() - 1).toString());
  const [toYear, setToYear] = useState(new Date().getFullYear().toString());
  const [toMonth, setToMonth] = useState(
    (new Date().getMonth() + 1).toString()
  );
  const [toDay, setToDay] = useState((new Date().getDate() + 1).toString());
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState([]);
  const [searchState, setSearchState] = useState(false);

  const [searchBtn, setSearchBtn] = useState(false);

  const [btnID, setBtnID] = useState("0");

  const [userDocCounter, setUserDocCounter] = useState(0);
  const [userDocsID, setUserDocsID] = useState([]);
  const [queryCounter, setQueryCounter] = useState(0);

  const loggedInUser = props.loggedInUser;

  let userDataArray = [];
  let userAllRecocdsArray = [];
  let userDocsIDArray = [];

  const queryLimit = 2;

  const fetchRecordData = async () => {
    setLoading(true);
    const DateFrom = new Date(
      fromYear,
      fromMonth - 1,
      fromDay,
      "00",
      "00",
      "01"
    );
    const DateTo = new Date(toYear, toMonth - 1, toDay, "23", "59", "59");

    const vitalsQuery = query(
      collection(db, "vitalsRecords"),
      where("userEmail", "==", loggedInUser),
      where("submitDate", ">=", DateFrom),
      where("submitDate", "<=", DateTo),
      orderBy("submitDate", "desc"),
      limit(queryLimit)
    );
    const querySnapshot = await getDocs(vitalsQuery);
    querySnapshot.forEach((doc) => {
      userDataArray.push(doc.data());
    });

    setUserData(userDataArray);
    setSearchState(true);

    const docCounterRef = query(
      collection(db, "vitalsRecords"),
      where("userEmail", "==", loggedInUser),
      where("submitDate", ">=", DateFrom),
      where("submitDate", "<=", DateTo),
      orderBy("submitDate", "desc")
    );
    const docSnap = await getDocs(docCounterRef);
    docSnap.forEach((doc) => {
      userDocsIDArray.push(doc.id);
      userAllRecocdsArray.push(doc.data());
    });
    setUserDocCounter(userAllRecocdsArray.length);
    setUserDocsID(userDocsIDArray);

    setLoading(false);
    setSearchBtn(false);
  };

  useEffect(() => {
    if (loading === true && searchBtn === true) {
      fetchRecordData().finally(
        setTimeout(function () {
          setLoading(false);
        }, 350)
      );
    }
  }, [searchBtn]);

  const FormHandler = () => {
    setLoading(true);
    setSearchBtn(true);
  };

  const idHandler = (event) => {
    setLoading(true);
    setBtnID(event.target.id);
  };

  const fetchPaginationData = async () => {
    setLoading(true);

    let clicked_id = parseInt(btnID);

    const DateFrom = new Date(
      fromYear,
      fromMonth - 1,
      fromDay,
      "00",
      "00",
      "01"
    );
    const DateTo = new Date(toYear, toMonth - 1, toDay, "23", "59", "59");

    clicked_id = clicked_id * 10;
    const lastItemIndex = clicked_id - 1;
    const firstItemIndex = lastItemIndex - 9;

    let firstItemRef = userDocsID[parseInt(firstItemIndex)];
    let lastItemRef = userDocsID[parseInt(lastItemIndex)];

    if (lastItemRef === undefined) {
      lastItemRef = null;
    }

    if (firstItemRef === undefined) {
      firstItemRef = null;
    }

    const vitalsQuery = query(
      collection(db, "vitalsRecords"),
      where("userEmail", "==", loggedInUser),
      where("submitDate", ">=", DateFrom),
      where("submitDate", "<=", DateTo),
      orderBy("submitDate", "desc"),
      startAt(firstItemRef),
      endAt(lastItemRef),
      limit(queryLimit)
    );

    const querySnapshot = await getDocs(vitalsQuery);
    querySnapshot.forEach((doc) => {
      userDataArray.push(doc.data());
    });

    setUserData(userDataArray);

    setSearchState(true);
    setLoading(false);
  };

  useEffect(() => {
    if (loading === true && btnID != 0) {
      fetchPaginationData().finally(
        setTimeout(function () {
          setLoading(false);
        }, 350)
      );
    }
  }, [btnID]);

  return (
    <div>
      <div className="pt-4 mb-4 d-flex flex-column align-items-center">
        <div className="form-custom">
          <div className="row mt-3">
            <div className="col-sm-12 col-lg-6">
              <h5>Από:</h5>
              <label className="label">Ημέρα</label>
              <select
                className="inputValues"
                onChange={(e) => setFromDay(e.target.value)}
                value={fromDay}
              >
                {DAYS.map((listObj) => (
                  <option key={listObj.day} value={listObj.day_value}>
                    {listObj.day}
                  </option>
                ))}
              </select>
              <label className="label">Μήνας</label>
              <select
                className="inputValues"
                onChange={(e) => setFromMonth(e.target.value)}
                value={fromMonth}
              >
                {MONTHS.map((listObj) => (
                  <option key={listObj.month} value={listObj.month_value}>
                    {listObj.month}
                  </option>
                ))}
              </select>
              <label className="label">Έτος</label>
              <select
                className="inputValues"
                onChange={(e) => setFromYear(e.target.value)}
                value={fromYear}
              >
                {YEARS.map((listObj) => (
                  <option key={listObj.year} value={listObj.year_value}>
                    {listObj.year}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-sm-12 col-lg-6">
              <h5>Έως:</h5>
              <label className="label">Ημέρα</label>
              <select
                className="inputValues"
                onChange={(e) => setToDay(e.target.value)}
                value={toDay}
              >
                {DAYS.map((listObj) => (
                  <option key={listObj.day} value={listObj.day_value}>
                    {listObj.day}
                  </option>
                ))}
              </select>
              <label className="label">Μήνας</label>
              <select
                className="inputValues"
                onChange={(e) => setToMonth(e.target.value)}
                value={toMonth}
              >
                {MONTHS.map((listObj) => (
                  <option key={listObj.month} value={listObj.month_value}>
                    {listObj.month}
                  </option>
                ))}
              </select>
              <label className="label">Έτος</label>
              <select
                className="inputValues"
                onChange={(e) => setToYear(e.target.value)}
                value={toYear}
              >
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
              id="0"
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
        <div className=" mt-5">
          <p className="mb-4 blockquote-footer">
            <b>Αποτελέσματα Αναζήτησης:</b>
          </p>
        </div>
        {userData.length === 0 ? (
          searchState ? (
            <div
              className="form-custom"
              style={{ backgroundColor: "var(--bs-danger)" }}
            >
              <p style={{ color: "var(--bs-dark)" }}>
                <b>
                  <FontAwesomeIcon
                    size="lg"
                    icon={faExclamationTriangle}
                    style={{ color: "var(--bs-dark)" }}
                  />
                  Δε βρέθηκαν καταχωρήσεις για τις συγκεκριμένες ημερομηνίες
                  υποβολής.
                </b>
              </p>
            </div>
          ) : null
        ) : loading ? (
          <FullScreenLoader setFullscreen={false} />
        ) : (
          userData.map((i, index) => (
            <div
              className="table-responsive container mt-5"
              id={index}
              key={index}
            >
              <div>
                <h5>
                  {i.submitDate.toDate().getDate()} /{" "}
                  {i.submitDate.toDate().getMonth() + 1} /{" "}
                  {i.submitDate.toDate().getFullYear()}
                </h5>
                <h6>
                  {i.submitDate.toDate().getHours()} :{" "}
                  {i.submitDate.toDate().getMinutes()}
                </h6>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Συστολική Πίεση (mmHg)</th>
                    <th scope="col">Διαστολική Πίεση (mmHg)</th>
                    <th scope="col">Παλμοί (bpm)</th>
                    <th scope="col">Θερμοκρασία (&#176;C)</th>
                    <th scope="col">Οξυγόνο (%)</th>
                    <th scope="col">Σάκχαρο (mg/dL)</th>
                    <th scope="col">Βάρος (Κιλά)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Τιμές:</th>
                    <td>{i.systolic}</td>
                    <td>{i.diastolic}</td>
                    <td>{i.pulses}</td>
                    <td>{i.temperature}</td>
                    <td>{i.oxygen}</td>
                    <td>{i.sugar}</td>
                    <td>{i.weight}</td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <th scope="row">Σχόλια:</th>
                    <td colSpan="7">{i.comments}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
      <div className="container d-flex">
        <div className="ms-auto">
          {userDocCounter === 0 ? null : (
            <p className="text-left">
              <b>Συνολικές εγγραφές: {userDocCounter}</b>
            </p>
          )}
          {userData.length === 0 ? null : (
            <div className="d-flex flex-wrap">
              <div className="p-1">
                <button
                  id="1"
                  className="btn btn-primary"
                  onClick={idHandler}
                  disabled={true}
                >
                  {" "}
                  1
                </button>
              </div>
              <div className="p-1">
                <button
                  id="2"
                  className="btn btn-outline-primary"
                  onClick={idHandler}
                >
                  {" "}
                  2
                </button>
              </div>
              <div className="p-1">
                <button
                  id="3"
                  className="btn btn-outline-primary"
                  onClick={idHandler}
                >
                  {" "}
                  3
                </button>
              </div>
              <div className="p-1">
                <button
                  id="4"
                  className="btn btn-outline-primary"
                  onClick={idHandler}
                >
                  {" "}
                  4
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VitalsHistoryForm;
