import { useEffect, useState, useRef } from "react";
import { MONTHS, DAYS, YEARS } from "../general/DateFile";
import { Modal } from "react-bootstrap";
// firestore
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  startAt,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
// font icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const VitalsHistoryForm = (props) => {
  const PageView_Ref = useRef(null);
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

  const [docIDs, setDocIDs] = useState("");

  const [deleteFileID, setDeleteFileID] = useState(null);
  const [boolDeleteFile, setBoolDeleteFile] = useState(false);

  const [searchBtn, setSearchBtn] = useState(false);

  const [btnID, setBtnID] = useState("0");

  const [userDocCounter, setUserDocCounter] = useState(0);
  const [paginationBtnsArray, setPaginationBtnsArray] = useState([]);

  // // modals
  // const [showDelete, setShowDelete] = useState(false);
  // const handeCloseDelete = () => setShowDelete(false);
  // const handeOpenDelete = () => setShowDelete(true);

  const loggedInUser = props.loggedInUser;

  let userDataArray = [];
  let userAllRecordsArray = [];
  let paginationArray = [];
  let docIDsArray = [];

  const queryLimit = 20;
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
      userAllRecordsArray.push(doc.data());
      docIDsArray.push(doc.id);
    });

    setDocIDs(docIDsArray);
    setUserAllRecords(userAllRecordsArray);
    setUserDocCounter(userAllRecordsArray.length);

    const paginationNumber = Math.ceil(userDocCounter / queryLimit);

    for (let i = 0; i < paginationNumber; i++) {
      paginationArray.push(i);
    }

    setPaginationBtnsArray(paginationArray);

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

    const vitalsQueryPagination = query(
      collection(db, "vitalsRecords"),
      where("userEmail", "==", loggedInUser),
      where("submitDate", ">=", DateFrom),
      where("submitDate", "<=", DateTo),
      orderBy("submitDate", "desc"),
      startAt(firstItemRef),
      limit(queryLimit)
    );

    userDataArray.length = 0;

    const querySnapshotPagination = await getDocs(vitalsQueryPagination);
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
      fetchPaginationData().finally(
        setTimeout(function () {
          setLoading(false);
        }, 350)
      );
    }
  }, [btnID, userData]);

  const scrollTo = () => {
    if (!PageView_Ref.current) return;
    PageView_Ref.current.scrollIntoView({ behavior: "smooth" });
  };

  // const deleteDataHandler = (event) => {
  //   setDeleteFileID(event.target.id);
  //   handeOpenDelete();
  // };

  // const DeleteConfirmation = async () => {
  //   const deleteRef = docIDs[parseInt(deleteFileID)];
  //   await deleteDoc(doc(db, "vitalsRecords", deleteRef));
  //   setBoolDeleteFile(true);
  // };

  // useEffect(() => {
  //   if (boolDeleteFile === true) {
  //     setBoolDeleteFile(false);

  //     var newResults = userData.filter(function (el) {
  //       return el.submitDate !== userData[parseInt(deleteFileID)].submitDate;
  //     });

  //     setUserData(newResults);
  //     setUserDocCounter(userDocCounter - 1);
  //     handeCloseDelete();
  //   }
  // }, [boolDeleteFile]);

  return (
    <div>
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
            <button
              id="0"
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
        <div className="mt-5" ref={PageView_Ref}>
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
                : "row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2"
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
                      {i.submitDate.toDate().getDate()} /{" "}
                      {i.submitDate.toDate().getMonth() + 1} /{" "}
                      {i.submitDate.toDate().getFullYear()},{" "}
                      {i.submitDate.toDate().getHours()} :{" "}
                      {i.submitDate.toDate().getMinutes() < 10
                        ? "0" + i.submitDate.toDate().getMinutes()
                        : i.submitDate.toDate().getMinutes()}
                    </div>
                    <div className="card-body text-dark">
                      <div className="row ">
                        <div className="col-sm-12 col-md-6 col-lg-6">
                          <p className="card-text  mt-3">
                            ?????????????????? ?????????? (mmHg): <b>{i.systolic}</b>
                          </p>
                          <hr className="hr-custom" />
                          <p className="card-text">
                            ???????????????????? ?????????? (mmHg): <b>{i.diastolic}</b>
                          </p>
                          <hr className="hr-custom" />
                          <p className="card-text">
                            ???????????? (bpm): <b>{i.pulses}</b>
                          </p>
                          <hr className="hr-custom" />
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6">
                          <p className="card-text mt-3">
                            ?????????????????????? (&#176;C): <b>{i.temperature}</b>
                          </p>
                          <hr className="hr-custom" />
                          <p className="card-text">
                            ?????????????? (%): <b>{i.oxygen}</b>
                          </p>
                          <hr className="hr-custom" />
                          <p className="card-text">
                            ?????????? (Kg): <b>{i.weight}</b>
                          </p>
                          <hr className="hr-custom" />
                        </div>
                      </div>
                      <div className="mt-3">
                        <p> ????????????: </p>
                        <textarea
                          rows="3"
                          className="w-100"
                          disabled={true}
                          value={i.comments}
                        >
                          <b>{i.comments}</b>
                        </textarea>
                        {/* <div>
                          <button
                            id={index}
                            className="btn btn-sm btn-danger"
                            onClick={deleteDataHandler}
                          >
                            ????????????????
                          </button>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
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

      {/* delete modal */}
      {/* <Modal show={showDelete} onHide={handeCloseDelete}>
        <Modal.Header>
          <Modal.Title>????????????????</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ?????????? ???????????????? ?????? ???????????? ???? ???????????????????? ???? ???????????????????????? ????????????????????;
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-danger"
            onClick={DeleteConfirmation}
          >
            ????????????????
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handeCloseDelete}
          >
            ??????????
          </button>
        </Modal.Footer>
      </Modal> */}
      {/*delete modal */}
    </div>
  );
};

export default VitalsHistoryForm;
