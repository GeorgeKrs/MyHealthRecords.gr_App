import { useState } from "react";
import { DropdownButton, Dropdown, SplitButton } from "react-bootstrap";
import {
  LineChart,
  YAxis,
  XAxis,
  CartesianGrid,
  Line,
  Tooltip,
} from "recharts";

const DiastolicPressureList = [
  120, 130, 110, 100, 140, 123, 150, 130, 95, 90, 110, 123, 150, 130, 110, 100,
  130, 123, 119, 120,
];

const Temperature = [
  38.3, 36.6, 36.6, 36.7, 37.3, 37.8, 36.6, 37.3, 36.6, 38.6, 36.1, 36.6, 37.3,
  36.9, 38.1, 39.5, 37.3, 39.3, 37.3, 37.3,
];

const MetricsTable = () => {
  const [activeCategory, setActiveCategory] = useState();
  const SelectHandler = (category) => {
    setActiveCategory(category);
    console.log(DiastolicPressureList);
  };

  const data = [
    {
      name: "Δε",
      temperature: 38.3,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Τρ",
      temperature: 38.6,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Τετ",
      temperature: 38.9,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Πεμ",
      temperature: 36.2,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Παρ",
      temperature: 36.6,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Σαβ",
      temperature: 36.6,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Κυρ",
      temperature: 37.3,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Δε",
      temperature: 38.9,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Τρ",
      temperature: 36.2,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Τετ",
      temperature: 36.6,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Πεμ",
      temperature: 36.6,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Παρ",
      temperature: 37.3,
      pv: 2400,
      amt: 2400,
    },
  ];

  const data2 = [
    {
      name: "Δε",
      temperature: 120,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Τρ",
      temperature: 130,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Τετ",
      temperature: 140,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Πεμ",
      temperature: 135,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Παρ",
      temperature: 140,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Σαβ",
      temperature: 146,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Κυρ",
      temperature: 95,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Δε",
      temperature: 137,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Τρ",
      temperature: 120,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Τετ",
      temperature: 120,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Πεμ",
      temperature: 125,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Παρ",
      temperature: 131,
      pv: 2400,
      amt: 2400,
    },
  ];

  return (
    <div className="form-custom">
      <div className="d-flex bd-highlight mb-2">
        <div className="me-auto p-2 bd-highlight">
          <p>
            <b>Πρόσφατες Καταχωρήσεις</b>
          </p>
          <p className="blockquote-footer">
            <small>
              <b>Τελευταίες 20 μετρήσεις.</b>
            </small>
          </p>
        </div>
        <div className="p-3 bd-highlight">
          <SplitButton
            key={"metrics-dropdown-button"}
            id={"metrics-dropdown-button"}
            variant={"danger"}
            title={"Ζωτικές Λειτουργίες"}
            onSelect={SelectHandler}
          >
            <Dropdown.Item eventKey="1">Πίεση</Dropdown.Item>
            <Dropdown.Item eventKey="2">Παλμοί</Dropdown.Item>
            <Dropdown.Item eventKey="3">Θερμοκρασία</Dropdown.Item>
            <Dropdown.Item eventKey="4">Οξυγόνο</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="5">Σάκχαρο</Dropdown.Item>
            <Dropdown.Item eventKey="6">Βάρος</Dropdown.Item>
          </SplitButton>
        </div>
      </div>
      <div>
        <LineChart
          width={600}
          height={300}
          data={activeCategory === "1" ? data : data2}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
};

export default MetricsTable;
