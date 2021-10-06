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
  doc,
  getDoc,
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

  const [lastItemVisible, setLastItemVisible] = useState(0);

  const [userDocCounter, setUserDocCounter] = useState(0);
  const [queryCounter, setQueryCounter] = useState(0);

  const [nextItem, setNextItem] = useState(false);
  const [prevItem, setPrevItem] = useState(false);

  const [startBtnStatus, setStartBtnStatus] = useState(true);
  const [nextBtnStatus, setNextBtnStatus] = useState(false);

  const loggedInUser = props.loggedInUser;

  let userDataArray = [];
  let userAllRecocdsArray = [];

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

    setLastItemVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);

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
      userAllRecocdsArray.push(doc.data());
    });

    setUserDocCounter(userAllRecocdsArray.length);
    console.log(userDocCounter);

    setQueryCounter(2 * queryLimit);

    setStartBtnStatus(true);
  };

  const LoadMore = async () => {
    const DateFrom = new Date(
      fromYear,
      fromMonth - 1,
      fromDay,
      "00",
      "00",
      "01"
    );
    const DateTo = new Date(toYear, toMonth - 1, toDay, "23", "59", "59");

    let loadItems = null;

    if (queryCounter >= userDocCounter) {
      setNextBtnStatus(true);
    } else {
      setNextBtnStatus(false);
    }

    if (nextItem === true) {
      loadItems = query(
        collection(db, "vitalsRecords"),
        where("userEmail", "==", loggedInUser),
        where("submitDate", ">=", DateFrom),
        where("submitDate", "<=", DateTo),
        orderBy("submitDate", "desc"),
        startAfter(lastItemVisible),
        limit(queryLimit)
      );
      const queryNextItems = await getDocs(loadItems);
      setLastItemVisible(queryNextItems.docs[queryNextItems.docs.length - 1]);

      queryNextItems.forEach((doc) => {
        userDataArray.push(doc.data());
      });

      setQueryCounter(queryCounter + queryLimit);

      setStartBtnStatus(false);
    } else if (prevItem === true) {
      loadItems = query(
        collection(db, "vitalsRecords"),
        where("userEmail", "==", loggedInUser),
        where("submitDate", ">=", DateFrom),
        where("submitDate", "<=", DateTo),
        orderBy("submitDate", "desc"),
        limit(queryLimit)
      );
      const queryNextItems = await getDocs(loadItems);
      setLastItemVisible(queryNextItems.docs[queryNextItems.docs.length - 1]);

      queryNextItems.forEach((doc) => {
        userDataArray.push(doc.data());
      });

      setQueryCounter(2 * queryLimit);

      setStartBtnStatus(true);
      setNextBtnStatus(false);
    }

    setUserData(userDataArray);
    setSearchState(true);
  };

  useEffect(() => {
    if (nextItem === true || prevItem === true) {
      LoadMore().then(
        setTimeout(function () {
          setLoading(false);
        }, 350)
      );
      setNextItem(false);
      setPrevItem(false);
    }
  }, [nextItem, prevItem]);

  useEffect(() => {
    if (loading === true) {
      fetchRecordData().then(
        setTimeout(function () {
          setLoading(false);
        }, 350)
      );
    }
    if (userDocCounter >= queryCounter) {
      setNextBtnStatus(false);
    } else {
      setNextBtnStatus(true);
    }
  }, [loading]);

  const FormHandler = () => {
    setLoading(true);
  };

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
          {userData.length === 0 ? null : (
            <div>
              <button
                disabled={startBtnStatus ? true : false}
                className="btn btn-primary"
                onClick={(e) => setPrevItem(true)}
              >
                <FontAwesomeIcon
                  size="lg"
                  icon={faAngleDoubleLeft}
                  style={{ color: "var(--bs-dark)" }}
                />
                Αρχή
              </button>
              <button
                disabled={nextBtnStatus ? true : false}
                className="mx-2 btn btn-danger"
                onClick={(e) => setNextItem(true)}
              >
                Επόμενο
                <FontAwesomeIcon
                  size="lg"
                  icon={faAngleRight}
                  style={{ color: "var(--bs-dark)" }}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VitalsHistoryForm;
