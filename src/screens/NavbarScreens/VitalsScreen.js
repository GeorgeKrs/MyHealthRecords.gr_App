import "../screens.css";
import TablePressure from "../../general/TablePressure";
import TableTemperature from "../../general/TableTemperature";
import DoctorsSpecs from "../../general/DoctorsSpecs";

const FormHandler = () => {
  console.log(DoctorsSpecs);
};

const VitalsScreen = () => {
  return (
    <div className="p-2 outer-VitalsDiv w-100 d-flex flex-column align-items-center">
      <div className="mt-4">
        <h3>Μέτρηση Ζωτικών Λειτουργιών</h3>
      </div>
      <div className="pt-5 mb-4">
        <div className="row">
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Συστολική Πίεση (mmHg)</label>
            <input
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
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Παλμοί (bpm)</label>
            <input type="number" className="inputValues"></input>
          </div>
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Θερμοκρασία (&#176;C)</label>
            <input type="number" step="0.1" className="inputValues"></input>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Οξυγόνο (%)</label>
            <input type="number" step="0.1" className="inputValues"></input>
          </div>
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Βάρος (Κιλά)</label>
            <input type="number" step="0.1" className="inputValues"></input>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-lg-12 mt-4">
            <label className="label">Σχόλια Μέτρησης:</label>
            <textarea className="inputValues" rows="4"></textarea>
          </div>
        </div>

        <div className="mt-5">
          <button
            type="button"
            className="btn btn-primary"
            onClick={FormHandler}
          >
            Καταχώρηση
          </button>
        </div>
      </div>
      <div className="mt-5 p-2">
        <h3>
          Πίνακες με ενδεικτικές φυσιολογικές τιμές για τις πιέσεις (Συστολική,
          Διαστολική) και τη Θερμοκρασία.
        </h3>
        <div className="mt-5 mb-5">
          <TablePressure />
        </div>
        <div className="mt-5">
          <TableTemperature />
        </div>
      </div>
    </div>
  );
};

export default VitalsScreen;
