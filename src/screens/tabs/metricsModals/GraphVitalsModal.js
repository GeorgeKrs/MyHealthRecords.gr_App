import { useState } from "react";
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
  const [loadingGraphData, setLoadingGraphData] = useState(false);
  const [graphData, setGraphData] = useState([]);

  const [categoryGraph, setCategoryGraph] = useState("systolic");
  const [monthGraph, setMonthGraph] = useState(0);
  const [yearGraph, setYearGraph] = useState("2022");

  // const

  return (
    <div
      className="offset-lg-2 col-lg-8 col-md-12 col-sm-12"
      style={{ overflowX: "hidden" }}
    >
      <div className="row">
        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12">
          <div className="p-1">
            <select
              className="btn btn-light"
              id="metricsSelect1"
              onChange={(e) => setCategoryGraph(e.target.value)}
            >
              <option defaultValue value="systolic">
                Συστολική Πίεση
              </option>
              <option value="diastolic">Διαστολική Πίεση</option>
              <option value="pulses">Παλμοί</option>
              <option value="temperature">Θερμοκρασία</option>
              <option value="oxygen">Οξυγόνο</option>
              <option value="weight">Βάρος</option>
            </select>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12">
          <div className="p-1">
            <select
              className="btn btn-light"
              id="metricsSelect2"
              onChange={(e) => setMonthGraph(e.target.value)}
            >
              <option defaultValue value="0">
                Ιανουάριος
              </option>
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
        </div>
        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12">
          <div className="p-1">
            <select
              className="btn btn-light"
              id="metricsSelect3"
              onChange={(e) => setYearGraph(e.target.value)}
            >
              <option defaultValue value="2022">
                2022
              </option>
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
        </div>
        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12">
          <div className="p-1">
            <button className="btn btn-secondary">Εφαρμογή Φίλτρων</button>
          </div>
        </div>
      </div>

      <div
        className="metrics-form-custom"
        style={{ width: "100%", height: 300 }}
      >
        <ResponsiveContainer width="99%" className="mt-2">
          <LineChart
            data={
              graphData === null || graphData === undefined ? null : graphData
            }
            margin={{
              top: 5,
              right: 10,
              left: -50,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="submitDate" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={
                graphData === null ||
                graphData === undefined ||
                graphData.length === 0
                  ? "Δεν υπάρχουν δεδομένα για τη συγκεκριμένη περίοδο επιλογής."
                  : graphData
              }
              stroke={
                categoryGraph === "systolic"
                  ? "var(--bs-dark)"
                  : categoryGraph === "diastolic"
                  ? "var(--bs-warning)"
                  : categoryGraph === "pulses"
                  ? "var(--bs-danger)"
                  : categoryGraph === "temperature"
                  ? "var(--bs-primary)"
                  : categoryGraph === "oxygen"
                  ? "var(--bs-success)"
                  : categoryGraph === "weight"
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
