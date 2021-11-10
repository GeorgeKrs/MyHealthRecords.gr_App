import { useState, useEffect } from "react";
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
import { faInfo } from "@fortawesome/free-solid-svg-icons";
// modals
import { Modal } from "react-bootstrap";

const GraphVitalsModal = (props) => {
  const [searchState, setSearchState] = useState(true);

  const [loadingGraphData, setLoadingGraphData] = useState(false);

  const [categoryGraph, setCategoryGraph] = useState("systolicValues");
  const [monthGraph, setMonthGraph] = useState(
    new Date().getMonth().toString()
  );
  const [yearGraph, setYearGraph] = useState(
    new Date().getFullYear().toString()
  );

  const [noDataStatus, setNoDataStatus] = useState(false);
  const [graphSystolic, setGraphSystolic] = useState([]);
  const [graphDiastolic, setGraphDiastolic] = useState([]);
  const [graphPulses, setGraphPulses] = useState([]);
  const [graphTemperature, setGraphTemperature] = useState([]);
  const [graphOxygen, setGraphOxygen] = useState([]);
  const [graphWeight, setGraphWeight] = useState([]);

  const [dateSearched, setDateSearched] = useState("");

  // min and max values
  const [maxSystolic, setMaxSystolic] = useState(0);
  const [minSystolic, setMinSystolic] = useState(0);

  const [maxDiastolic, setMaxDiastolic] = useState(0);
  const [minDiastolic, setMinDiastolic] = useState(0);

  const [maxPulses, setMaxPulses] = useState(0);
  const [minPulses, setMinPulses] = useState(0);

  const [maxTemperature, setMaxTemperature] = useState(0);
  const [minTemperature, setMinTemperature] = useState(0);

  const [maxOxygen, setMaxOxygen] = useState(0);
  const [minOxygen, setMinOxygen] = useState(0);

  const [maxWeight, setMaxWeight] = useState(0);
  const [minWeight, setMinWeight] = useState(0);

  // modals
  const [chartInfo, setChartInfo] = useState(false);
  const handleCloseChartInfo = () => setChartInfo(false);
  const handleOpenChartInfo = () => setChartInfo(true);

  const loggedInUser = props.loggedInUser;

  const filtersHandler = () => {
    setSearchState(true);
  };

  const fetchData = async () => {
    let systolicArray = [];
    let diastolicArray = [];
    let pulsesArray = [];
    let temperatureArray = [];
    let oxygenArray = [];
    let weightArray = [];
    let submitDateArray = [];

    let gdSystolic = [];
    let gdDiastolic = [];
    let gdPulses = [];
    let gdTemperature = [];
    let gdOxygen = [];
    let gdWeight = [];

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

    const graphVitalsQuery = query(
      collection(db, "vitalsRecords"),
      where("userEmail", "==", loggedInUser),
      where("submitDate", ">=", startDate),
      where("submitDate", "<=", endDate),
      orderBy("submitDate", "asc")
    );

    const querySnapshot = await getDocs(graphVitalsQuery);
    querySnapshot.forEach((doc) => {
      systolicArray.push(doc.data().systolic);
      diastolicArray.push(doc.data().diastolic);
      pulsesArray.push(doc.data().pulses);
      temperatureArray.push(doc.data().temperature);
      oxygenArray.push(doc.data().oxygen);
      weightArray.push(doc.data().weight);
      submitDateArray.push(doc.data().submitDate);
    });

    for (let i = 0; i < systolicArray.length; ++i) {
      let tempDateDay = submitDateArray[i].toDate().getDate() + "/";
      let tempDateMonth = submitDateArray[i].toDate().getMonth() + 1;
      let tempDate = tempDateDay.concat(tempDateMonth);

      // dealing with empty values
      if (systolicArray[i] === "") {
        systolicArray[i] = 140;
      }
      if (diastolicArray[i] === "") {
        diastolicArray[i] = 100;
      }
      if (pulsesArray[i] === "") {
        pulsesArray[i] = 69.5;
      }
      if (temperatureArray[i] === "") {
        temperatureArray[i] = 36.7;
      }
      if (oxygenArray[i] === "") {
        oxygenArray[i] = 98.5;
      }
      if (weightArray[i] === "") {
        weightArray[i] = 80;
      }

      gdSystolic.push({
        date: tempDate,
        Μέτρηση: systolicArray[i],
      });

      gdDiastolic.push({
        date: tempDate,
        Μέτρηση: diastolicArray[i],
      });

      gdPulses.push({
        date: tempDate,
        Μέτρηση: pulsesArray[i],
      });

      gdTemperature.push({
        date: tempDate,
        Μέτρηση: temperatureArray[i],
      });

      gdOxygen.push({
        date: tempDate,
        Μέτρηση: oxygenArray[i],
      });

      gdWeight.push({
        date: tempDate,
        Μέτρηση: weightArray[i],
      });
    }

    if (
      gdSystolic.length === 0 &&
      gdDiastolic.length === 0 &&
      gdPulses.length === 0 &&
      gdTemperature.length === 0 &&
      gdOxygen.length === 0 &&
      gdWeight.length === 0
    ) {
      setNoDataStatus(true);
    } else {
      setNoDataStatus(false);
    }

    setGraphSystolic(gdSystolic);
    setGraphDiastolic(gdDiastolic);
    setGraphPulses(gdPulses);
    setGraphTemperature(gdTemperature);
    setGraphOxygen(gdOxygen);
    setGraphWeight(gdWeight);

    const monthShow = parseInt(monthGraph) + 1 + "/";
    const yearShow = yearGraph;

    setDateSearched(monthShow.concat(yearShow));

    const maxSystolic = Math.max.apply(Math, systolicArray);
    const minSystolic = Math.min.apply(Math, systolicArray);

    const maxDiastolic = Math.max.apply(Math, diastolicArray);
    const minDiastolic = Math.min.apply(Math, diastolicArray);

    const maxPulses = Math.max.apply(Math, pulsesArray);
    const minPulses = Math.min.apply(Math, pulsesArray);

    const maxTemperature = Math.max.apply(Math, temperatureArray);
    const minTemperature = Math.min.apply(Math, temperatureArray);

    const maxOxygen = Math.max.apply(Math, oxygenArray);
    const minOxygen = Math.min.apply(Math, oxygenArray);

    const maxWeight = Math.max.apply(Math, weightArray);
    const minWeight = Math.min.apply(Math, weightArray);

    setMaxSystolic(maxSystolic);
    setMinSystolic(minSystolic);
    setMaxDiastolic(maxDiastolic);
    setMinDiastolic(minDiastolic);
    setMaxPulses(maxPulses);
    setMinPulses(minPulses);
    setMaxTemperature(maxTemperature);
    setMinTemperature(minTemperature);
    setMaxOxygen(maxOxygen);
    setMinOxygen(minOxygen);
    setMaxWeight(maxWeight);
    setMinWeight(minWeight);
  };

  useEffect(() => {
    if (searchState === true) fetchData().finally(setSearchState(false));
  }, [searchState]);

  useEffect(() => {}, [categoryGraph]);

  return (
    <div
      className="offset-lg-2 col-lg-8 col-md-12 col-sm-12"
      style={{ overflow: "hidden" }}
    >
      <div className="row">
        <div className="mt-2 px-3">
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
              onChange={(e) => setCategoryGraph(e.target.value)}
            >
              <option defaultValue value="systolicValues">
                Συστολική Πίεση
              </option>
              <option value="diastolicValues">Διαστολική Πίεση</option>
              <option value="pulsesValues">Παλμοί</option>
              <option value="temperatureValues">Θερμοκρασία</option>
              <option value="oxygenValues">Οξυγόνο</option>
              <option value="weightValues">Βάρος</option>
            </select>
          </div>
          <div className="px-2">
            <button
              className="btn btn-outline-dark"
              onClick={handleOpenChartInfo}
            >
              <FontAwesomeIcon
                size="lg"
                icon={faInfo}
                style={{ color: "var(--bs-purple)" }}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="px-3 text-danger">
        <b>
          Περίοδος Δεδομένων:
          <span className="px-1">
            {dateSearched === null ? null : dateSearched.toString()}
          </span>
        </b>
      </div>

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
              categoryGraph === "systolicValues"
                ? graphSystolic
                : categoryGraph === "diastolicValues"
                ? graphDiastolic
                : categoryGraph === "pulsesValues"
                ? graphPulses
                : categoryGraph === "temperatureValues"
                ? graphTemperature
                : categoryGraph === "oxygenValues"
                ? graphOxygen
                : categoryGraph === "weightValues"
                ? graphWeight
                : null
            }
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={"date"} />
            <YAxis
              type="number"
              domain={
                categoryGraph === "systolicValues"
                  ? [50, maxSystolic + 10]
                  : categoryGraph === "diastolicValues"
                  ? [30, maxDiastolic + 10]
                  : categoryGraph === "pulsesValues"
                  ? [40, maxPulses + 10]
                  : categoryGraph === "temperatureValues"
                  ? [34, maxTemperature + 2]
                  : categoryGraph === "oxygenValues"
                  ? [0, 100]
                  : categoryGraph === "weightValues"
                  ? [30, maxWeight + 30]
                  : null
              }
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={
                noDataStatus === true
                  ? "Δεν υπάρχουν δεδομένα για τη συγκεκριμένη περίοδο επιλογής."
                  : "Μέτρηση"
              }
              stroke={
                categoryGraph === "systolicValues"
                  ? "var(--bs-dark)"
                  : categoryGraph === "diastolicValues"
                  ? "var(--bs-warning)"
                  : categoryGraph === "pulsesValues"
                  ? "var(--bs-danger)"
                  : categoryGraph === "temperatureValues"
                  ? "var(--bs-primary)"
                  : categoryGraph === "oxygenValues"
                  ? "var(--bs-success)"
                  : categoryGraph === "weightValues"
                  ? "var(--bs-info)"
                  : "var(--bs-primary)"
              }
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* more info modal */}
      <Modal show={chartInfo} onHide={handleOpenChartInfo}>
        <Modal.Header>
          <Modal.Title>Πληροφορίες</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Οι παρακάτω γραφικές παραστάσεις δείχνουν αποτελέσματα με βάση τις
          μετρήσεις σας.
        </Modal.Body>
        <Modal.Body>
          Οι κενές τιμές των ζωτικών λειτουργιών σας (πεδία δηλαδή που αφήσατε
          κενά κατά τη διάρκεια των εγγραφών σας) αντικαθιστούνται με τη τιμή
          του μέσου όρου από όλες τις μετρήσεις σας.
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCloseChartInfo}
          >
            Κλείσιμο
          </button>
        </Modal.Footer>
      </Modal>
      {/* end of more info modal */}
    </div>
  );
};

export default GraphVitalsModal;
