import { useState, useEffect, useRef } from "react";
import { MONTHS, DAYS, YEARS } from "../general/DateFile";
import FullScreenLoader from "../general/FullScreenLoader";
import DoctorsSpecs from "../general/DoctorsSpecs";
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

const PDFHistoryForm = (props) => {
  const PageView_Ref = useRef(null);
  const [doctorSpec, setDoctorSpec] = useState("");

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
      doctorSpec === null ||
      doctorSpec === undefined ||
      doctorSpec === "" ||
      doctorSpec === "allSpecs"
    ) {
      const pdfQuery = query(
        collection(db, "pdfRecords"),
        where("userEmail", "==", loggedInUser),
        where("SubmitDate", ">=", DateFrom),
        where("SubmitDate", "<=", DateTo),
        orderBy("SubmitDate", "desc"),
        limit(queryLimit)
      );

      const querySnapshot = await getDocs(pdfQuery);
      querySnapshot.forEach((doc) => {
        userDataArray.push(doc.data());
      });

      setUserData(userDataArray);
      setSearchState(true);

      const docCounterRef = query(
        collection(db, "pdfRecords"),
        where("userEmail", "==", loggedInUser),
        where("SubmitDate", ">=", DateFrom),
        where("SubmitDate", "<=", DateTo),
        orderBy("SubmitDate", "desc")
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
      const pdfQuery = query(
        collection(db, "pdfRecords"),
        where("userEmail", "==", loggedInUser),
        where("doctorSpec", "==", doctorSpec),
        where("SubmitDate", ">=", DateFrom),
        where("SubmitDate", "<=", DateTo),
        orderBy("SubmitDate", "desc"),
        limit(queryLimit)
      );

      const querySnapshot = await getDocs(pdfQuery);
      querySnapshot.forEach((doc) => {
        userDataArray.push(doc.data());
      });

      setUserData(userDataArray);
      setSearchState(true);

      const docCounterRef = query(
        collection(db, "pdfRecords"),
        where("userEmail", "==", loggedInUser),
        where("doctorSpec", "==", doctorSpec),
        where("SubmitDate", ">=", DateFrom),
        where("SubmitDate", "<=", DateTo),
        orderBy("SubmitDate", "desc")
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

    const firstItemRef = userAllRecords[firstItemIndex].SubmitDate;

    const pdfQueryPagination = query(
      collection(db, "pdfRecords"),
      where("userEmail", "==", loggedInUser),
      where("SubmitDate", ">=", DateFrom),
      where("SubmitDate", "<=", DateTo),
      orderBy("SubmitDate", "desc"),
      startAt(firstItemRef),
      limit(queryLimit)
    );

    userDataArray.length = 0;

    const querySnapshotPagination = await getDocs(pdfQueryPagination);
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
  }, [btnID, userData]);

  const scrollTo = () => {
    if (!PageView_Ref.current) return;
    PageView_Ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="pt-4 mb-4 d-flex flex-column align-items-center">
      <div className="form-custom">
        <div className="row mt-3">
          <div className="col-sm-12 col-lg-6">
            <h5>??????:</h5>
            <label className="label">??????????</label>
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
            <label className="label">??????????</label>
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
            <label className="label">????????</label>
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
            <h5>??????:</h5>
            <label className="label">??????????</label>
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
            <label className="label">??????????</label>
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
            <label className="label">????????</label>
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
          <h5>???????????????? ???????????????????? ????????????:</h5>
          <div className="col-lg-4 col-sm-12 mt-3">
            <select
              className="inputValues"
              onChange={(e) => setDoctorSpec(e.target.value)}
            >
              <option value="allSpecs">???????? ???? ??????????????????????</option>
              {DoctorsSpecs.map((doctor, index) => (
                <option key={index} value={doctor}>
                  {doctor}
                </option>
              ))}
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
            <span>{loading ? "????????????????????..." : "??????????????????"}</span>
          </button>
        </div>
      </div>
      <div className="mt-5">
        <p className="mb-4 blockquote-footer">
          <b>???????????????????????? ????????????????????:</b>
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
                    ???? ???????????????? ???????????????????????? ?????? ?????? ?????????????????????????? ??????????????????????
                    ????????????????.
                  </b>
                </p>
              </div>
            ) : null
          ) : (
            userData.map((i, index) => (
              <div className="col" id={index} key={index}>
                <div className="card border-primary mb-3">
                  <div className="card-header">
                    {i.SubmitDate.toDate().getDate()} /{" "}
                    {i.SubmitDate.toDate().getMonth() + 1} /{" "}
                    {i.SubmitDate.toDate().getFullYear()},{" "}
                    {i.SubmitDate.toDate().getHours()} :{" "}
                    {i.SubmitDate.toDate().getMinutes() < 10
                      ? "0" + i.SubmitDate.toDate().getMinutes()
                      : i.SubmitDate.toDate().getMinutes()}
                  </div>
                  <div className="card-body text-dark">
                    <p className="card-text">????????????????????: {i.doctorSpec}</p>
                    <hr className="hr-custom" />
                    <p className="card-text">
                      ????????????:
                      <a
                        href={i.pdfUrl}
                        className="link-primary px-1"
                        target="_blank"
                      >
                        {i.fileName}
                      </a>
                    </p>
                    <hr className="hr-custom" />
                    <p> ????????????: </p>
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
              <b>?????????????????? ????????????????: {userDocCounter}</b>
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

export default PDFHistoryForm;
