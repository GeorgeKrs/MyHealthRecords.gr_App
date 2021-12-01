import { useEffect, useState, useRef } from "react";
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
  startAt,
} from "firebase/firestore";
import { db } from "../utils/firebase";
// font icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const BloodHistoryForm = (props) => {
  const PageView_Ref = useRef(null);
  const [categoryType, setCategoryType] = useState("beforeBreakfast");

  const [fromYear, setFromYear] = useState(new Date().getFullYear().toString());
  const [fromMonth, setFromMonth] = useState(
    (new Date().getMonth() + 1).toString()
  );
  const [fromDay, setFromDay] = useState((new Date().getDate() - 1).toString());
  const [toYear, setToYear] = useState(new Date().getFullYear().toString());
  const [toMonth, setToMonth] = useState(
    (new Date().getMonth() + 1).toString()
  );
  const [toDay, setToDay] = useState(new Date().getDate().toString());
  const [loading, setLoading] = useState(false);

  const [paginationLoading, setPaginationLoading] = useState(false);
  // fetching data of user
  const [userData, setUserData] = useState([]);
  // date for query
  const [userAllRecords, setUserAllRecords] = useState(null);
  const [searchState, setSearchState] = useState(false);

  const [searchBtn, setSearchBtn] = useState(false);
  // counter for cards row

  const [btnID, setBtnID] = useState("0");

  const [userDocCounter, setUserDocCounter] = useState(0);
  const [paginationBtnsArray, setPaginationBtnsArray] = useState([]);

  const loggedInUser = props.loggedInUser;

  let userDataArray = [];
  let userAllRecordsArray = [];
  let paginationArray = [];

  const queryLimit = 18;

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

    if (
      categoryType === null ||
      categoryType === undefined ||
      categoryType === "" ||
      categoryType === "allCategories"
    ) {
      const bloodSugarHistoryQuery = query(
        collection(db, "bloodSugarRecords"),
        where("userEmail", "==", loggedInUser),
        where("submitDate", ">=", DateFrom),
        where("submitDate", "<=", DateTo),
        orderBy("submitDate", "desc"),
        limit(queryLimit)
      );

      const querySnapshot = await getDocs(bloodSugarHistoryQuery);
      querySnapshot.forEach((doc) => {
        userDataArray.push(doc.data());
      });

      setUserData(userDataArray);
      setSearchState(true);

      const docCounterRef = query(
        collection(db, "bloodSugarRecords"),
        where("userEmail", "==", loggedInUser),
        where("submitDate", ">=", DateFrom),
        where("submitDate", "<=", DateTo),
        orderBy("submitDate", "desc")
      );
      const docSnap = await getDocs(docCounterRef);
      docSnap.forEach((doc) => {
        userAllRecordsArray.push(doc.data());
      });

      setUserAllRecords(userAllRecordsArray);
      setUserDocCounter(userAllRecordsArray.length);

      const paginationNumber = Math.ceil(userDocCounter / queryLimit);

      for (let i = 0; i < paginationNumber; i++) {
        paginationArray.push(i);
      }

      setPaginationBtnsArray(paginationArray);
    } else {
      const bloodSugarHistoryQuery = query(
        collection(db, "bloodSugarRecords"),
        where("userEmail", "==", loggedInUser),
        where("category", "==", categoryType),
        where("submitDate", ">=", DateFrom),
        where("submitDate", "<=", DateTo),
        orderBy("submitDate", "desc"),
        limit(queryLimit)
      );

      const querySnapshot = await getDocs(bloodSugarHistoryQuery);
      querySnapshot.forEach((doc) => {
        userDataArray.push(doc.data());
      });

      setUserData(userDataArray);
      setSearchState(true);

      const docCounterRef = query(
        collection(db, "bloodSugarRecords"),
        where("userEmail", "==", loggedInUser),
        where("category", "==", categoryType),
        where("submitDate", ">=", DateFrom),
        where("submitDate", "<=", DateTo),
        orderBy("submitDate", "desc")
      );
      const docSnap = await getDocs(docCounterRef);
      docSnap.forEach((doc) => {
        userAllRecordsArray.push(doc.data());
      });

      setUserAllRecords(userAllRecordsArray);
      setUserDocCounter(userAllRecordsArray.length);

      const paginationNumber = Math.ceil(userDocCounter / queryLimit);

      for (let i = 0; i < paginationNumber; i++) {
        paginationArray.push(i);
      }

      setPaginationBtnsArray(paginationArray);
    }

    setBtnID("1");
    setLoading(false);
    setSearchBtn(false);
    scrollTo();
  };

  const FormHandler = () => {
    setLoading(true);
    setSearchBtn(true);
    setPaginationLoading(false);
  };

  const idHandler = (event) => {
    setLoading(true);
    setBtnID(event.target.id);
    setPaginationLoading(true);
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
      "00"
    );
    const DateTo = new Date(toYear, toMonth - 1, toDay, "23", "59", "59");

    let firstItemIndex = 0;
    if (clicked_id != 1) {
      clicked_id = clicked_id * queryLimit;
      firstItemIndex = clicked_id - queryLimit;
    } else {
      firstItemIndex = 0;
    }

    const firstItemRef = userAllRecords[firstItemIndex].submitDate;

    const bloodHistoryQueryPagination = query(
      collection(db, "bloodSugarRecords"),
      where("userEmail", "==", loggedInUser),
      where("submitDate", ">=", DateFrom),
      where("submitDate", "<=", DateTo),
      orderBy("submitDate", "desc"),
      startAt(firstItemRef),
      limit(queryLimit)
    );

    userDataArray.length = 0;

    const querySnapshotPagination = await getDocs(bloodHistoryQueryPagination);
    querySnapshotPagination.forEach((doc) => {
      userDataArray.push(doc.data());
    });

    setUserData(userDataArray);

    setSearchState(true);
    setLoading(false);
    scrollTo();
  };

  useEffect(() => {
    if (loading === true && searchBtn === true && paginationLoading === false) {
      fetchRecordData();
    }
  }, [searchBtn, paginationBtnsArray]);

  useEffect(() => {
    if (
      loading === true &&
      paginationLoading === true &&
      (btnID !== "0" || btnID !== 0 || btnID != 0)
    ) {
      fetchPaginationData();
    }
  }, [btnID]);

  const scrollTo = () => {
    if (!PageView_Ref.current) return;
    PageView_Ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
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
          <h5>Κατηγορία Μέτρησης:</h5>
          <div className="col-lg-4 col-sm-12 mt-3">
            <select
              className="inputValues"
              onChange={(e) => setCategoryType(e.target.value)}
            >
              <option defaultValue value="beforeBreakfast">
                Πριν το πρωινό
              </option>
              <option value="afterBreakfast">2 Ώρες μετά το πρωινό</option>
              <option value="beforeLunch">Πριν το μεσημεριανό</option>
              <option value="afterLunch">2 Ώρες μετά το μεσημεριανό</option>
              <option value="beforeDinner">Πριν το βραδινό</option>
              <option value="afterDinner">2 Ώρες μετά το βραδινό</option>
              <option value="beforeBed">Πριν τον ύπνο</option>
              <option value="other">Άλλο</option>
              <option value="allCategories">Όλες</option>
            </select>
          </div>
        </div>

        <div className="mt-5">
          <button
            type="button"
            className="btn btn-primary"
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

      <div className="mt-5">
        <p className="mb-4 blockquote-footer">
          <b>Αποτελέσματα Αναζήτησης:</b>
        </p>
      </div>
      <div
        ref={PageView_Ref}
        className={userData.length === 0 ? null : "container mt-5"}
      >
        <div
          className={
            userData.length === 0
              ? null
              : "row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3"
          }
        >
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
          ) : (
            userData.map((i, index) => (
              <div className="col" id={index} key={index}>
                <div className="card border-primary mb-3">
                  <div className="card-header">
                    {i.submitDate.toDate().getDate()} /{" "}
                    {i.submitDate.toDate().getMonth() + 1} /{" "}
                    {i.submitDate.toDate().getFullYear()},{" "}
                    {i.submitDate.toDate().getHours()} :{" "}
                    {i.submitDate.toDate().getMinutes() < 10
                      ? "0" + i.submitDate.toDate().getMinutes()
                      : i.submitDate.toDate().getMinutes()}
                  </div>
                  <div className="card-body text-dark">
                    <p className="card-text">Σάκχαρο (mg/dl): {i.bloodSugar}</p>
                    <hr className="hr-custom" />
                    <p className="card-text">
                      Κατηγορία:{" "}
                      {i.category === "beforeBreakfast"
                        ? "Πριν το πρωινό"
                        : i.category === "afterBreakfast"
                        ? "2 Ώρες μετά το πρωινό"
                        : i.category === "beforeLunch"
                        ? "Πριν το μεσημεριανό"
                        : i.category === "afterLunch"
                        ? "2 Ώρες μετά το μεσημεριανό"
                        : i.category === "beforeDinner"
                        ? "Πριν το βραδινό"
                        : i.category === "afterDinner"
                        ? "2 Ώρες μετά το βραδινό"
                        : i.category === "beforeBed"
                        ? "Πριν τον ύπνο"
                        : i.category === "other"
                        ? "Άλλο"
                        : null}
                    </p>
                    <hr className="hr-custom" />
                    <p> Σχόλια: </p>
                    <textarea
                      rows="3"
                      className="w-100"
                      disabled={true}
                      value={i.comments}
                    >
                      {i.comments}
                    </textarea>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
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
              {paginationBtnsArray.map((index) => (
                <div className="p-1" key={index + 1}>
                  <button
                    id={index + 1}
                    className="btn btn-primary"
                    disabled={index + 1 == btnID ? true : false}
                    onClick={idHandler}
                  >
                    {index + 1}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default BloodHistoryForm;
