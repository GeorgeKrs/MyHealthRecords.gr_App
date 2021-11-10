import { useState, useEffect } from "react";
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
  };

  useEffect(() => {
    if (searchState === true) fetchData().finally(setSearchState(false));
  }, [searchState]);

  useEffect(() => {}, [categoryGraph]);

  return (
    <div
      className="offset-lg-2 col-lg-8 col-md-12 col-sm-12"
      style={{ overflowX: "hidden" }}
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
            <option value="2022">2025</option>
            <option value="2022">2024</option>
            <option value="2022">2023</option>
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

        <div className="mt-4 px-3">
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
      </div>

      <div
        className="metrics-form-custom mt-2"
        style={{ height: 300, overflowX: "hidden" }}
      >
        <ResponsiveContainer width="99%" className="">
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
                  ? [50, 170]
                  : categoryGraph === "diastolicValues"
                  ? [30, 115]
                  : categoryGraph === "pulsesValues"
                  ? [40, 200]
                  : categoryGraph === "temperatureValues"
                  ? [34, 43]
                  : categoryGraph === "oxygenValues"
                  ? [0, 100]
                  : categoryGraph === "weightValues"
                  ? [30, 210]
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
    </div>
  );
};

export default GraphVitalsModal;
