import { useState, useEffect } from "react";
import ErrorMsg from "../general/ErrorMsg";
// firebase
import { db } from "../utils/firebase";
import { addDoc, Timestamp, collection } from "firebase/firestore";

const VitalsForm = () => {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulses, setPulses] = useState("");
  const [temperature, setTemperature] = useState("");
  const [oxygen, setOxygen] = useState("");
  const [sugar, setSugar] = useState("");
  const [weight, setWeight] = useState("");
  const [comments, setComments] = useState("");

  const [erSystolic, setErSystolic] = useState("");
  const [erDiastolic, setErDiastolic] = useState("");
  const [erPulses, setErPulses] = useState("");
  const [erTemperature, setErTemperature] = useState("");
  const [erOxygen, setErOxygen] = useState("");
  const [erSugar, setErSugar] = useState("");
  const [erWeight, setErWeight] = useState("");

  const [loading, setLoading] = useState(false);

  const ValidateSystolic = (systolic) => {
    if ((systolic < 50 || systolic > 220) && systolic !== "") {
      setErSystolic("Τιμή εκτός ορίων. 50 < Συστολική Πίεση < 220.");
    } else {
      setErSystolic("");
    }
  };

  const ValidateDiastolic = (diastolic) => {
    if ((diastolic < 30 || diastolic > 115) && diastolic !== "") {
      setErDiastolic("Τιμή εκτός ορίων. 30 < Διαστολική Πίεση < 115.");
    } else {
      setErDiastolic("");
    }
  };

  const ValidatePulses = (pulses) => {
    if ((pulses < 40 || pulses > 220) && pulses !== "") {
      setErPulses("Τιμή εκτός ορίων. 40 < Παλμοί < 220.");
    } else {
      setErPulses("");
    }
  };

  const ValidateTemperature = (temperature) => {
    if ((temperature < 34 || temperature > 43) && temperature !== "") {
      setErTemperature("Τιμή εκτός ορίων. 34 < Θερμοκρασία < 43");
    } else {
      setErTemperature("");
    }
  };

  const ValidateOxygen = (oxygen) => {
    if ((oxygen < 70 || oxygen > 100) && oxygen !== "") {
      setErOxygen("Τιμή εκτός ορίων. 70 < Οξυγόνο (%)< 100");
    } else {
      setErOxygen("");
    }
  };

  const ValidateSugar = (sugar) => {
    if ((sugar < 85 || sugar > 350) && sugar !== "") {
      setErSugar("Τιμή εκτός ορίων. 85 < Σάκχαρο < 350");
    } else {
      setErSugar("");
    }
  };

  const ValidateWeight = (weight) => {
    if ((weight < 30 || weight > 300) && weight !== "") {
      setErWeight("Τιμή εκτός ορίων. 30 < Κιλά < 300");
    } else {
      setErWeight("");
    }
  };

  const FormHandler = () => {
    setLoading(true);

    let isEmpty = true;

    if (
      systolic === "" &&
      diastolic === "" &&
      pulses === "" &&
      temperature === "" &&
      oxygen === "" &&
      sugar === "" &&
      weight === ""
    ) {
      alert("all empty modal");
    } else {
      isEmpty = false;
    }

    if (
      isEmpty === false &&
      erSystolic === "" &&
      erDiastolic === "" &&
      erPulses === "" &&
      erTemperature === "" &&
      erOxygen === "" &&
      erSugar === "" &&
      erWeight === ""
    ) {
      alert("API CALL success modal");
      (async () => {
        await addDoc(collection(db, "vitalsRecords"), {
          userEmail: "gkoursoumis97@gmail.com",
          systolic: systolic,
          diastolic: diastolic,
          temperature: temperature,
          oxygen: oxygen,
          sugar: sugar,
          weight: weight,
          comments: comments,
          SubmitDate: Timestamp.fromDate(new Date()),
        });
      })();
    } else {
      alert("API CALL FAILED modal");
    }

    setTimeout(() => {
      setLoading(false);
    }, 500);
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
              onInput={(e) => ValidateSystolic(e.target.value)}
            />
            {erSystolic ? <ErrorMsg ErrorMsg={erSystolic}></ErrorMsg> : null}
          </div>
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Διαστολική Πίεση (mmHg)</label>
            <input
              type="number"
              className="inputValues"
              placeholder="Μικρή Πίεση"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              onInput={(e) => ValidateDiastolic(e.target.value)}
            />
            {erDiastolic ? <ErrorMsg ErrorMsg={erDiastolic}></ErrorMsg> : null}
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
              onInput={(e) => ValidatePulses(e.target.value)}
            />
            {erPulses ? <ErrorMsg ErrorMsg={erPulses}></ErrorMsg> : null}
          </div>
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Θερμοκρασία (&#176;C)</label>
            <input
              type="number"
              step="0.1"
              className="inputValues"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              onInput={(e) => ValidateTemperature(e.target.value)}
            />
            {erTemperature ? (
              <ErrorMsg ErrorMsg={erTemperature}></ErrorMsg>
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
              onInput={(e) => ValidateOxygen(e.target.value)}
            />
            {erOxygen ? <ErrorMsg ErrorMsg={erOxygen}></ErrorMsg> : null}
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
              onInput={(e) => ValidateSugar(e.target.value)}
            />
            {erSugar ? <ErrorMsg ErrorMsg={erSugar}></ErrorMsg> : null}
          </div>
          <div className="col-sm-12 col-lg-6 mt-4">
            <label className="label">Βάρος (Κιλά)</label>
            <input
              type="number"
              step="0.1"
              className="inputValues"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              onInput={(e) => ValidateWeight(e.target.value)}
            />
            {erWeight ? <ErrorMsg ErrorMsg={erWeight}></ErrorMsg> : null}
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
