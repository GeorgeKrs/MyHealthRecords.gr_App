import { useState } from "react";
import DoctorsSpecs from "../general/DoctorsSpecs";

const VitalsForm = () => {
  // const [enteredVitalsSystolic, setEnteredVitalsSystolic] = useState();
  // const [enteredVitalsDiastolic, setEnteredVitalsDiastolic] = useState();
  // const [enteredVitalsPulses, setEnteredVitalsPulses] = useState();
  // const [enteredVitalsTemperature, setEnteredVitalsTemperature] = useState();
  // const [enteredVitalsBloodOxygen, setEnteredVitalsBloodOxygen] = useState();
  // const [enteredVitalsWeight, setEnteredVitalsWeight] = useState();
  // const [enteredVitalsComments, setEnteredVitalsComments] = useState();

  const FormHandler = (event) => {
    event.preventDefault();

    console.log(DoctorsSpecs);
  };
  return (
    <div className="pt-5 mb-4">
      <form onSubmit={FormHandler}>
        <div className="row">
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Συστολική Πίεση (mmHg)</label>
            <input
              // value={enteredVitalsSystolic}
              // onChange={VitalsSystolicChangeHandler}
              type="number"
              className="inputValues"
              placeholder="Μεγάλη Πίεση"
            ></input>
          </div>
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Διαστολική Πίεση (mmHg)</label>
            <input
              type="number"
              className="inputValues"
              placeholder="Μικρή Πίεση"
              // value={enteredVitalsSystolic}
              // onChange={VitalsSystolicChangeHandler}
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Παλμοί (bpm)</label>
            <input
              type="number"
              className="inputValues"
              // value={enteredVitalsSystolic}
              // onChange={VitalsSystolicChangeHandler}
            ></input>
          </div>
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Θερμοκρασία (&#176;C)</label>
            <input
              type="number"
              step="0.1"
              className="inputValues"
              // value={enteredVitalsSystolic}
              // onChange={VitalsSystolicChangeHandler}
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Οξυγόνο (%)</label>
            <input
              type="number"
              step="0.1"
              className="inputValues"
              // value={enteredVitalsSystolic}
              // onChange={VitalsSystolicChangeHandler}
            ></input>
          </div>
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Βάρος (Κιλά)</label>
            <input
              type="number"
              step="0.1"
              className="inputValues"
              // value={enteredVitalsSystolic}
              // onChange={VitalsSystolicChangeHandler}
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-lg-12 mt-4">
            <label className="label">Σχόλια Μέτρησης:</label>
            <textarea
              className="inputValues"
              rows="4"
              // value={enteredVitalsSystolic}
              // onChange={VitalsSystolicChangeHandler}
            ></textarea>
          </div>
        </div>

        <div className="mt-5">
          <button type="submit" className="btn btn-outline-primary">
            Καταχώρηση
          </button>
        </div>
      </form>
    </div>
  );
};

export default VitalsForm;
