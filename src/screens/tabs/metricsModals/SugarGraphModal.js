import { useState, useEffect } from "react";
//
import Gutters from "../../../general/Gutters";
// firestore
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../../utils/firebase";
// recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// font icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faSquare } from "@fortawesome/free-solid-svg-icons";

const SugarGraphModal = (props) => {
  const [dayGraph, setDayGraph] = useState(new Date().getDate().toString());

  const [monthGraph, setMonthGraph] = useState(
    new Date().getMonth().toString()
  );

  const [yearGraph, setYearGraph] = useState(
    new Date().getFullYear().toString()
  );

  const [loadingGraphData, setLoadingGraphData] = useState(false);
  const [searchState, setSearchState] = useState(true);
  const [noDataStatus, setNoDataStatus] = useState(false);
  const [noSingleDayDataStatus, setNoSingleDayDataStatus] = useState(false);

  const [singleDayResults, setSingleDayResults] = useState(
    new Date().getDate().toString() +
      "/" +
      new Date().getMonth().toString() +
      "/" +
      new Date().getFullYear().toString()
  );

  const [monthDaysResults, setMonthDaysResults] = useState(
    new Date().getMonth().toString() + "/" + new Date().getFullYear().toString()
  );

  const [categoryGraph, setCategoryGraph] = useState("beforeBreakfast");

  const [graphSingleDay, setGraphSingleDay] = useState([]);

  const [graphBeforeBreakfast, setGraphBeforeBreakfast] = useState([]);
  const [graphAfterBreakfast, setGraphAfterBreakfast] = useState([]);
  const [graphBeforeLunch, setGraphBeforeLunch] = useState([]);
  const [graphAfterLunch, setGraphAfterLunch] = useState([]);
  const [graphBeforeDinner, setGraphBeforeDinner] = useState([]);
  const [graphAfterDinner, setGraphAfterDinner] = useState([]);
  const [graphBeforeBed, setGraphBeforeBed] = useState([]);
  const [graphOther, setGraphOther] = useState([]);

  const [filterMode, setFilterMode] = useState(true);
  /*  two available filter modes
      first mode (Status: False): Filter by month, year & category
      second mode (Status: True): Filter by day, month, year (all categories) */

  const loggedInUser = props.loggedInUser;

  const filtersHandler = () => {
    setSearchState(true);
  };

  const fetchData = async () => {
    let gdSingleDay = [];

    let beforeBreakfastArray = [];
    let afterBreakfastArray = [];
    let beforeLunchArray = [];
    let afterLunchArray = [];
    let beforeDinnerArray = [];
    let afterDinnerArray = [];
    let beforeBedArray = [];
    let otherArray = [];
    let categoryArray = [];
    let bloodSugarArray = [];
    let submitDateArray = [];

    let monthDays = 0;

    if (
      monthGraph == "3" ||
      monthGraph == "5" ||
      monthGraph == "8" ||
      monthGraph == "10"
    ) {
      monthDays = 30;
    } else if (monthGraph == "1") {
      monthDays = 28;
    } else {
      monthDays = 31;
    }

    const startDate = new Date(yearGraph, monthGraph, 1, "00", "00", "01");
    const endDate = new Date(
      yearGraph,
      monthGraph,
      monthDays,
      "23",
      "59",
      "59"
    );

    // filter mode true
    const graphSugarQuery = query(
      collection(db, "bloodSugarRecords"),
      where("userEmail", "==", loggedInUser),
      where("submitDate", ">=", startDate),
      where("submitDate", "<=", endDate),
      orderBy("submitDate", "asc")
    );

    const querySugarSnapshot = await getDocs(graphSugarQuery);
    querySugarSnapshot.forEach((doc) => {
      categoryArray.push(doc.data().category);
      bloodSugarArray.push(doc.data().bloodSugar);

      const day = doc.data().submitDate.toDate().getDate();
      // let hours = doc.data().submitDate.toDate().getHours();
      // let minutes = doc.data().submitDate.toDate().getMinutes();

      // if (hours < 10) {
      //   hours = "0" + hours;
      // }

      // if (minutes < 10) {
      //   minutes = "0" + minutes;
      // }
      // const tempHours = hours + ":";
      // const tempMinutes = minutes;

      // const finalDateShow = tempHours.concat(tempMinutes);
      const finalDateShow = day;

      if (doc.data().category === "beforeBreakfast") {
        beforeBreakfastArray.push({
          Μέτρηση: doc.data().bloodSugar,
          date: finalDateShow,
        });
      } else if (doc.data().category === "afterBreakfast") {
        afterBreakfastArray.push({
          Μέτρηση: doc.data().bloodSugar,
          date: finalDateShow,
        });
      } else if (doc.data().category === "beforeLunch") {
        beforeLunchArray.push({
          Μέτρηση: doc.data().bloodSugar,
          date: finalDateShow,
        });
      } else if (doc.data().category === "afterLunch") {
        afterLunchArray.push({
          Μέτρηση: doc.data().bloodSugar,
          date: finalDateShow,
        });
      } else if (doc.data().category === "beforeDinner") {
        beforeDinnerArray.push({
          Μέτρηση: doc.data().bloodSugar,
          date: finalDateShow,
        });
      } else if (doc.data().category === "afterDinner") {
        afterDinnerArray.push({
          Μέτρηση: doc.data().bloodSugar,
          date: finalDateShow,
        });
      } else if (doc.data().category === "beforeBed") {
        beforeBedArray.push({
          Μέτρηση: doc.data().bloodSugar,
          date: finalDateShow,
        });
      } else if (doc.data().category === "other") {
        otherArray.push({
          Μέτρηση: doc.data().bloodSugar,
          date: finalDateShow,
        });
      } else {
        console.log(
          "Παρουσιάστηκε άγνωστο σφάλμα. Παρακαλώ προσπαθήστε αργότερα."
        );
      }
    });

    if (
      beforeBreakfastArray.length === 0 &&
      afterBreakfastArray.length === 0 &&
      beforeLunchArray.length === 0 &&
      afterLunchArray.length === 0 &&
      beforeDinnerArray.length === 0 &&
      afterDinnerArray.length === 0 &&
      beforeBedArray.length === 0 &&
      otherArray.length === 0
    ) {
      setNoDataStatus(true);
    } else {
      setNoDataStatus(false);

      setGraphBeforeBreakfast(beforeBreakfastArray);
      setGraphAfterBreakfast(afterBreakfastArray);
      setGraphBeforeLunch(beforeLunchArray);
      setGraphAfterLunch(afterLunchArray);
      setGraphBeforeDinner(beforeDinnerArray);
      setGraphAfterDinner(afterDinnerArray);
      setGraphBeforeBed(beforeBedArray);
      setGraphOther(otherArray);
    }

    setMonthDaysResults(parseInt(monthGraph) + 1 + "/" + yearGraph);
    setSingleDayResults(
      dayGraph + "/" + (parseInt(monthGraph) + 1) + "/" + yearGraph
    );

    // filter mode false
    const startSingleDay = new Date(
      yearGraph,
      monthGraph,
      dayGraph,
      "00",
      "00",
      "01"
    );
    const endSingleDate = new Date(
      yearGraph,
      monthGraph,
      dayGraph,
      "23",
      "59",
      "59"
    );

    const graphSugarSingleQuery = query(
      collection(db, "bloodSugarRecords"),
      where("userEmail", "==", loggedInUser),
      where("submitDate", ">=", startSingleDay),
      where("submitDate", "<=", endSingleDate),
      orderBy("submitDate", "asc")
    );

    const querySugarSingleSnapshot = await getDocs(graphSugarSingleQuery);
    querySugarSingleSnapshot.forEach((doc) => {
      let hours = doc.data().submitDate.toDate().getHours();
      let minutes = doc.data().submitDate.toDate().getMinutes();

      if (hours < 10) {
        hours = "0" + hours;
      }

      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      const tempHours = hours + ":";
      const tempMinutes = minutes;

      const finalTime = tempHours.concat(tempMinutes);

      gdSingleDay.push({ dates: finalTime, Μέτρηση: doc.data().bloodSugar });

      if (gdSingleDay.length === 0) {
        setNoSingleDayDataStatus(true);
      } else {
        setNoSingleDayDataStatus(false);
      }
    });

    setGraphSingleDay(gdSingleDay);
  };

  useEffect(() => {
    if (searchState === true) fetchData().finally(setSearchState(false));
  }, [searchState]);

  return (
    <div
      className="offset-lg-2 col-lg-8 col-md-12 col-sm-12"
      style={{ overflow: "hidden" }}
    >
      <b>
        <h5>Μέθοδος χάραξης γραφικής παράστασης σακχάρου:</h5>
      </b>
      <div className="mt-4 d-flex d-inline-flex">
        <div className="px-2">
          {filterMode === true ? (
            <FontAwesomeIcon
              size="lg"
              icon={faCheckSquare}
              style={{ color: "var(--bs-dark)" }}
            />
          ) : (
            <FontAwesomeIcon
              size="lg"
              icon={faSquare}
              style={{ color: "var(--bs-dark)" }}
              onClick={(e) => setFilterMode(true)}
            />
          )}
        </div>
        <div>
          <h6>
            Γραφική παράσταση με βάση τις τιμές όλων των μετρήσεων ανά μήνα, ανά
            κατηγορία.
          </h6>
        </div>
      </div>
      <div className="d-flex">
        <div className="px-2">
          {filterMode === false ? (
            <FontAwesomeIcon
              size="lg"
              icon={faCheckSquare}
              style={{ color: "var(--bs-dark)" }}
            />
          ) : (
            <FontAwesomeIcon
              size="lg"
              icon={faSquare}
              style={{ color: "var(--bs-dark)" }}
              onClick={(e) => setFilterMode(false)}
            />
          )}
        </div>
        <div>
          <h6>
            Γραφική παράσταση με βάση τις τιμές όλων των μετρήσεων ανά ημέρα.
          </h6>
        </div>
      </div>

      <div className="row mt-4">
        {filterMode === true ? null : (
          <div className="mt-4 px-3">
            <select
              className="btn btn-light border border-dark"
              id="metricsSelect2"
              onChange={(e) => setDayGraph(e.target.value)}
              value={dayGraph}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>
          </div>
        )}
        <div className="mt-2 px-3">
          <select
            className="btn btn-light border border-dark"
            id="metricsSelect2"
            onChange={(e) => setMonthGraph(e.target.value)}
            value={monthGraph}
          >
            <option value="0">Ιανουάριος</option>
            <option value="1">Φεβρουάριος</option>
            <option value="2">Μάρτιος</option>
            <option value="3">Απρίλιος</option>
            <option value="4">Μάιος</option>
            <option value="5">Ιούνιος</option>
            <option value="6">Ιούλιος</option>
            <option value="7">Αύγουστος</option>
            <option value="8">Σεπτέμβριος</option>
            <option value="9">Οκτώβριος</option>
            <option value="10">Νοέμβριος</option>
            <option value="11">Δεκέμβριος</option>
          </select>
        </div>

        <div className="mt-2 px-3">
          <select
            className="btn btn-light border border-dark"
            id="metricsSelect3"
            onChange={(e) => setYearGraph(e.target.value)}
            value={yearGraph}
          >
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
          </select>
        </div>
        <div className="mt-2 px-3 mb-4">
          <button
            id="metricsSelect1"
            className="btn btn-secondary "
            type="button"
            onClick={filtersHandler}
          >
            Εφαρμογή Φίλτρων
          </button>
        </div>

        {filterMode === true ? (
          <div className="mt-4 px-3 d-flex flex-wrap">
            <div className="mb-2">
              <select
                className="btn btn-light border border-dark"
                id="metricsSelect1"
                onChange={(e) => setCategoryGraph(e.target.value)}
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
              </select>
            </div>
          </div>
        ) : null}
        <div className="px-3 text-danger">
          <b>
            {filterMode === true ? "Περίοδος Δεδομένων: " : "Ημέρα Δεδομένων: "}
            <span className="px-1">
              {filterMode === true ? monthDaysResults : singleDayResults}
            </span>
          </b>
        </div>
      </div>

      {filterMode === true ? (
        <div
          className="metrics-form-custom mt-2"
          style={{ height: 300, overflow: "hidden" }}
        >
          <ResponsiveContainer
            width="95%"
            className=""
            style={{ overflow: "hidden" }}
          >
            <LineChart
              data={
                categoryGraph === "beforeBreakfast"
                  ? graphBeforeBreakfast
                  : categoryGraph === "afterBreakfast"
                  ? graphAfterBreakfast
                  : categoryGraph === "beforeLunch"
                  ? graphBeforeLunch
                  : categoryGraph === "afterLunch"
                  ? graphAfterLunch
                  : categoryGraph === "beforeDinner"
                  ? graphBeforeDinner
                  : categoryGraph === "afterDinner"
                  ? graphAfterDinner
                  : categoryGraph === "beforeBed"
                  ? graphBeforeBed
                  : categoryGraph === "other"
                  ? graphOther
                  : null
              }
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey={noDataStatus === true ? null : "date"} />

              <YAxis type="number" domain={[0, 200]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={
                  noDataStatus === true
                    ? "Δεν υπάρχουν δεδομένα για τoν συγκεκριμένo μήνα επιλογής."
                    : "Μέτρηση"
                }
                stroke={"var(--bs-primary)"}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div
          className="metrics-form-custom mt-2"
          style={{ height: 300, overflow: "hidden" }}
        >
          <ResponsiveContainer
            width="95%"
            className=""
            style={{ overflow: "hidden" }}
          >
            <LineChart data={graphSingleDay}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey={"dates"} />

              <YAxis type="number" domain={[0, 200]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={
                  noSingleDayDataStatus === true
                    ? "Δεν υπάρχουν δεδομένα για τη συγκεκριμένη ημέρα επιλογής."
                    : "Μέτρηση"
                }
                stroke={"var(--bs-primary)"}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default SugarGraphModal;
