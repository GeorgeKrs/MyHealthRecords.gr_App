import { useState, useEffect } from "react";
import ErrorMsg from "../general/ErrorMsg";
// firebase
import { db } from "../utils/firebase";
import { addDoc, Timestamp, collection } from "firebase/firestore";

const VitalsForm = () => {
  const [form, setForm] = useState([
    { systolic: "" },
    { diastolic: "" },
    { pulses: "" },
    { temperature: "" },
    { oxygen: "" },
    { sugar: "" },
    { weight: "" },
  ]);

  const [errors, setError] = useState([
    { erSystolic: "" },
    { erDiastolic: "" },
    { erPulses: "" },
    { erTemperature: "" },
    { erOxygen: "" },
    { erSugar: "" },
    { erWeight: "" },
    { erComments: "" },
  ]);

  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulses, setPulses] = useState("");
  const [temperature, setTemperature] = useState("");
  const [oxygen, setOxygen] = useState("");
  const [sugar, setSugar] = useState("");
  const [weight, setWeight] = useState("");
  const [comments, setComments] = useState("");

  const [loading, setLoading] = useState(false);

  const FormHandler = () => {
    setLoading(true);

    // console.log(systolic);
    // console.log(diastolic);
    // console.log(pulses);
    // console.log(temperature);
    // console.log(oxygen);
    // console.log(diastolic);
    // console.log(sugar);
    // console.log(weight);
    // console.log(comments);

    if (
      systolic === "" &&
      diastolic === "" &&
      pulses === "" &&
      temperature === "" &&
      oxygen === "" &&
      sugar === "" &&
      weight === ""
    ) {
      alert("all empty");
    } else {
      alert("at least 1 value");
    }
    // (async () => {
    //   await addDoc(collection(db, "vitalsRecords"), {
    //     email: "gkoursoumis97@gmail.com",
    //     systolic: form.systolic,
    //     diastolic: form.diastolic,
    //     temperature: form.temperature,
    //     oxygen: form.oxygen,
    //     sugar: form.sugar,
    //     weight: form.weight,
    //     comments: form.comments,
    //     SubmitDate: Timestamp.fromDate(new Date()),
    //   });
    // })();

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="pt-4 mb-4">
      <div className="form-custom">
        <div className="row">
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Συστολική Πίεση (mmHg)</label>
            <input
              type="number"
              className="inputValues"
              placeholder="Μεγάλη Πίεση"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
            />
            {errors.erSystolic ? (
              <ErrorMsg ErrorMsg={errors.erSystolic}></ErrorMsg>
            ) : null}
          </div>
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Διαστολική Πίεση (mmHg)</label>
            <input
              type="number"
              className="inputValues"
              placeholder="Μικρή Πίεση"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
            />
            {errors.erDiastolic ? (
              <ErrorMsg ErrorMsg={errors.erDiastolic}></ErrorMsg>
            ) : null}
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Παλμοί (bpm)</label>
            <input
              type="number"
              className="inputValues"
              value={pulses}
              onChange={(e) => setPulses(e.target.value)}
            />
            {errors.erPulses ? (
              <ErrorMsg ErrorMsg={errors.erPulses}></ErrorMsg>
            ) : null}
          </div>
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Θερμοκρασία (&#176;C)</label>
            <input
              type="number"
              step="0.1"
              className="inputValues"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
            />
            {errors.erTemperature ? (
              <ErrorMsg ErrorMsg={errors.erTemperature}></ErrorMsg>
            ) : null}
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Οξυγόνο (%)</label>
            <input
              type="number"
              step="0.1"
              className="inputValues"
              value={oxygen}
              onChange={(e) => setOxygen(e.target.value)}
            />
            {errors.erOxygen ? (
              <ErrorMsg ErrorMsg={errors.erOxygen}></ErrorMsg>
            ) : null}
          </div>
          <div className="col-sm-12 col-lg-6 mt-4"></div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Σάκχαρο (mg/dL)</label>
            <input
              type="number"
              className="inputValues"
              value={sugar}
              onChange={(e) => setSugar(e.target.value)}
            />
            {errors.erSugar ? (
              <ErrorMsg ErrorMsg={errors.erSugar}></ErrorMsg>
            ) : null}
          </div>
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Βάρος (Κιλά)</label>
            <input
              type="number"
              step="0.1"
              className="inputValues"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            {errors.erWeight ? (
              <ErrorMsg ErrorMsg={errors.erWeight}></ErrorMsg>
            ) : null}
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-lg-12 mt-4">
            <label className="label">Σχόλια Μέτρησης:</label>
            <textarea
              className="inputValues"
              rows="4"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="mt-5">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={FormHandler}
            disabled={loading ? true : false}
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
            )}
            <span>{loading ? "Περιμένετε..." : "Καταχώρηση"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VitalsForm;
