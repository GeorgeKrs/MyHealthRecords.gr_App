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
  const [monthGraph, setMonthGraph] = useState(
    new Date().getMonth().toString()
  );

  const [yearGraph, setYearGraph] = useState(
    new Date().getFullYear().toString()
  );

  const [loadingGraphData, setLoadingGraphData] = useState(false);
  const [searchState, setSearchState] = useState(true);
  const [noDataStatus, setNoDataStatus] = useState(false);
  const [graphBeforeMeal, setGraphBeforeMeal] = useState([]);
  const [graphAfterMeal, setGraphAfterMeal] = useState([]);
  const [graphBeforeBed, setGraphBeforeBed] = useState([]);
  const [graphOther, setGraphOther] = useState([]);

  // min and max values
  const [maxBeforeMeal, setMaxBeforeMeal] = useState(0);
  const [minBeforeMeal, setMinBeforeMeal] = useState(0);

  const [maxAfterMeal, setMaxAfterMeal] = useState(0);
  const [minAfterMeal, setMinAfterMeal] = useState(0);

  const [maxBeforeBed, setMaxBeforeBed] = useState(0);
  const [minBeforeBed, setMinBeforeBed] = useState(0);

  const [maxOther, setMaxOther] = useState(0);
  const [minOther, setMinOther] = useState(0);

  const [filterMode, setFilterMode] = useState(true);
  /*  two available filter modes
      first mode (Status: False): Filter by month, year & category
      second mode (Status: True): Filter by day, month, year (all categories) */

  const loggedInUser = props.loggedInUser;

  const filtersHandler = () => {
    setSearchState(true);
  };

  const fetchData = async () => {};

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
        <div className="mt-4 px-3">
          <select
            className="btn btn-light"
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
            className="btn btn-light"
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
            className="btn btn-secondary"
            type="button"
            onClick={filtersHandler}
          >
            Εφαρμογή Φίλτρων
          </button>
        </div>

        <div className="mt-4 px-3 d-flex flex-wrap">
          <div className="mb-2">
            <select
              className="btn btn-light"
              id="metricsSelect1"
              //   onChange={(e) => setCategoryGraph(e.target.value)}
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
      </div>
    </div>
  );
};

export default SugarGraphModal;
