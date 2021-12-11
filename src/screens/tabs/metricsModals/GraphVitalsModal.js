import { useState, useEffect } from "react";
import Gutters from "../../../general/Gutters";
import CustomTooltip from "../../../general/CustomTooltip";
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
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
// font icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
// modals
import { Modal } from "react-bootstrap";

const GraphVitalsModal = (props) => {
  const loggedInUser = props.loggedInUser;

  const [categoryGraph, setCategoryGraph] = useState("systolicValues");
  const [monthGraph, setMonthGraph] = useState("none");
  const [yearGraph, setYearGraph] = useState(
    new Date().getFullYear().toString()
  );

  const [searchState, setSearchState] = useState(false);
  const [loadingGraphData, setLoadingGraphData] = useState(false);
  const [noDataStatus, setNoDataStatus] = useState(false);
  const [graphSystolic, setGraphSystolic] = useState([]);
  const [graphDiastolic, setGraphDiastolic] = useState([]);
  const [graphPulses, setGraphPulses] = useState([]);
  const [graphTemperature, setGraphTemperature] = useState([]);
  const [graphOxygen, setGraphOxygen] = useState([]);
  const [graphWeight, setGraphWeight] = useState([]);

  const [dateSearched, setDateSearched] = useState("");

  // min and max values
  const [maxSystolic, setMaxSystolic] = useState("-");
  const [minSystolic, setMinSystolic] = useState("-");

  const [maxDiastolic, setMaxDiastolic] = useState("-");
  const [minDiastolic, setMinDiastolic] = useState("-");

  const [maxPulses, setMaxPulses] = useState("-");
  const [minPulses, setMinPulses] = useState("-");

  const [maxTemperature, setMaxTemperature] = useState("-");
  const [minTemperature, setMinTemperature] = useState("-");

  const [maxOxygen, setMaxOxygen] = useState("-");
  const [minOxygen, setMinOxygen] = useState("-");

  const [maxWeight, setMaxWeight] = useState("-");
  const [minWeight, setMinWeight] = useState("-");

  // modals
  const [chartInfo, setChartInfo] = useState(false);
  const handleCloseChartInfo = () => setChartInfo(false);
  const handleOpenChartInfo = () => setChartInfo(true);

  const filtersHandler = () => {
    setSearchState(true);
    setLoadingGraphData(true);
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
      let tempDate = submitDateArray[i].toDate().getDate();

      // dealing with empty values
      if (systolicArray[i] === "") {
        systolicArray[i] = props.systolicAv;
      }
      if (diastolicArray[i] === "") {
        diastolicArray[i] = props.diastolicAv;
      }
      if (pulsesArray[i] === "") {
        pulsesArray[i] = props.pulsesAv;
      }
      if (temperatureArray[i] === "") {
        temperatureArray[i] = props.temperatureAv;
      }
      if (oxygenArray[i] === "") {
        oxygenArray[i] = props.oxygenAv;
      }
      if (weightArray[i] === "") {
        weightArray[i] = props.weightAv;
      }

      gdSystolic.push({
        date: tempDate,
        Συστολική: systolicArray[i],
      });

      gdDiastolic.push({
        date: tempDate,
        Διαστολική: diastolicArray[i],
      });

      gdPulses.push({
        date: tempDate,
        Παλμοί: pulsesArray[i],
      });

      gdTemperature.push({
        date: tempDate,
        Θερμοκρασία: temperatureArray[i],
      });

      gdOxygen.push({
        date: tempDate,
        Οξυγόνο: oxygenArray[i],
      });

      gdWeight.push({
        date: tempDate,
        Βάρος: weightArray[i],
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
    setLoadingGraphData(false);
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
        <h5 className="text-bolder">Γραφική παράσταση ζωτικών λειτουργιών:</h5>
      </b>
      <div className="row">
        <div className="mt-2 px-3">
          <select
            className="btn btn-light border border-dark"
            id="metricsSelect2"
            onChange={(e) => setMonthGraph(e.target.value)}
            value={monthGraph}
          >
            <option defaultValue value="none">
              Επιλέξτε Μήνα
            </option>
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
          {monthGraph === "none" ? (
            <CustomTooltip content={"Επιλέξτε μήνα και εφαρμόστε τα φίλτρα."}>
              <button
                id="metricsSelect1"
                className="btn btn-secondary"
                type="button"
                onClick={filtersHandler}
                disabled={monthGraph === "none" ? true : false}
              >
                Εφαρμογή Φίλτρων
              </button>
            </CustomTooltip>
          ) : (
            <button
              id="metricsSelect1"
              className="btn btn-secondary"
              type="button"
              onClick={filtersHandler}
              disabled={monthGraph === "none" ? true : false}
            >
              Εφαρμογή Φίλτρων
            </button>
          )}
        </div>

        <div className="mt-4 px-3 d-flex flex-wrap">
          <div className="mb-2">
            <select
              className="btn btn-light border border-dark"
              id="metricsSelect1"
              onChange={(e) => setCategoryGraph(e.target.value)}
            >
              <option defaultValue value="systolicValues">
                Συστολική Πίεση (mmHg)
              </option>
              <option value="diastolicValues">Διαστολική Πίεση (mmHg)</option>
              <option value="pulsesValues">Παλμοί (bpm)</option>
              <option value="temperatureValues">Θερμοκρασία (&#176;C)</option>
              <option value="oxygenValues">Οξυγόνο (%)</option>
              <option value="weightValues">Βάρος (Kg)</option>
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
          {loadingGraphData ? (
            <div className="mx-2 spinner-border spinner-border-sm text-danger">
              <span className="sr-only"></span>
            </div>
          ) : (
            <span className="px-1">
              {dateSearched === null ? null : dateSearched.toString()}
            </span>
          )}
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
            <Tooltip />

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

            <Legend />

            <Line
              type="monotone"
              dataKey={
                noDataStatus === true
                  ? "Δεν υπάρχουν δεδομένα για τη συγκεκριμένη περίοδο επιλογής."
                  : categoryGraph === "systolicValues"
                  ? "Συστολική"
                  : categoryGraph === "diastolicValues"
                  ? "Διαστολική"
                  : categoryGraph === "pulsesValues"
                  ? "Παλμοί"
                  : categoryGraph === "temperatureValues"
                  ? "Θερμοκρασία"
                  : categoryGraph === "oxygenValues"
                  ? "Οξυγόνο"
                  : categoryGraph === "weightValues"
                  ? "Βάρος"
                  : null
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
      <hr
        className={
          categoryGraph === "systolicValues"
            ? "border border-1 border-dark"
            : categoryGraph === "diastolicValues"
            ? "border border-1 border-warning"
            : categoryGraph === "pulsesValues"
            ? "border border-1 border-danger"
            : categoryGraph === "temperatureValues"
            ? "border border-1 border-primary"
            : categoryGraph === "oxygenValues"
            ? "border border-1 border-success"
            : categoryGraph === "weightValues"
            ? "border border-1 border-info"
            : "border border-1 border-dark"
        }
      />
      <div className="mt-4">
        <h6>
          <b>
            Μέγιστες και ελάχιστες τιμές ζωτικών λειτουργιών του επιλεγμένου
            μήνα.
          </b>
        </h6>
        <div
          className="mt-1 row row-cols-2 row-cols-l
        g-3 g-2 g-lg-3"
        >
          <Gutters
            gutterTitle={"Συστολική Πίεση (mmHg)"}
            gutterMax={
              maxSystolic === maxSystolic / 0
                ? "-"
                : isNaN(maxSystolic)
                ? "-"
                : maxSystolic
            }
            gutterMin={
              minSystolic === minSystolic / 0
                ? "-"
                : isNaN(maxSystolic)
                ? "-"
                : minSystolic
            }
            gutterBorderColor={"border-primary"}
            loadingState={loadingGraphData}
          />
          <Gutters
            gutterTitle={"Διαστολική Πίεση (mmHg)"}
            gutterMax={
              maxDiastolic === maxDiastolic / 0
                ? "-"
                : isNaN(maxSystolic)
                ? "-"
                : maxDiastolic
            }
            gutterMin={
              minDiastolic === minDiastolic / 0
                ? "-"
                : isNaN(maxSystolic)
                ? "-"
                : minDiastolic
            }
            gutterBorderColor={"border-primary"}
            loadingState={loadingGraphData}
          />
          <Gutters
            gutterTitle={"Παλμοί (bpm)"}
            gutterMax={
              maxPulses === maxPulses / 0
                ? "-"
                : isNaN(maxPulses)
                ? "-"
                : maxPulses
            }
            gutterMin={
              minPulses === minPulses / 0
                ? "-"
                : isNaN(minPulses)
                ? "-"
                : minPulses
            }
            gutterBorderColor={"border-primary"}
            loadingState={loadingGraphData}
          />
          <Gutters
            gutterTitle={"Θερμοκρασία (" + String.fromCharCode(176) + "C)"}
            gutterMax={
              maxTemperature === maxTemperature / 0
                ? "-"
                : isNaN(maxTemperature)
                ? "-"
                : maxTemperature
            }
            gutterMin={
              minTemperature === minTemperature / 0
                ? "-"
                : isNaN(minTemperature)
                ? "-"
                : minTemperature
            }
            gutterBorderColor={"border-primary"}
            loadingState={loadingGraphData}
          />
          <Gutters
            gutterTitle={"Οξυγόνο (%)"}
            gutterMax={
              maxOxygen === maxOxygen / 0
                ? "-"
                : isNaN(maxOxygen)
                ? "-"
                : maxOxygen
            }
            gutterMin={
              minOxygen === minOxygen / 0
                ? "-"
                : isNaN(minOxygen)
                ? "-"
                : minOxygen
            }
            gutterBorderColor={"border-primary"}
            loadingState={loadingGraphData}
          />
          <Gutters
            gutterTitle={"Βάρος (Kg)"}
            gutterMax={
              maxWeight === maxWeight / 0
                ? "-"
                : isNaN(maxWeight)
                ? "-"
                : maxWeight
            }
            gutterMin={
              minWeight === minWeight / 0
                ? "-"
                : isNaN(minWeight)
                ? "-"
                : minWeight
            }
            gutterBorderColor={"border-primary"}
            loadingState={loadingGraphData}
          />
        </div>
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
