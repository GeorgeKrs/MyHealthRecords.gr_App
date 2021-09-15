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

  const [loading, setLoading] = useState(false);

  // useEffect(() => {

  //   if (form.systolic < 50 || form.systolic > 220) {
  //     setError((errors) => ({
  //       ...errors,
  //       erSystolic: "Τιμή εκτός ορίων. 50 < Συστολική Πίεση < 220.",
  //     }));
  //   } else {
  //     setError((errors) => ({
  //       ...errors,
  //       erSystolic: "",
  //     }));
  //   }
  //   if (form.diastolic < 30 || form.diastolic > 115) {
  //     setError((errors) => ({
  //       ...errors,
  //       erDiastolic: "Τιμή εκτός ορίων. 30 < Διαστολική Πίεση < 115.",
  //     }));
  //   } else {
  //     setError((errors) => ({
  //       ...errors,
  //       erDiastolic: "",
  //     }));
  //   }
  //   if (form.pulses < 40 || form.pulses > 220) {
  //     setError((errors) => ({
  //       ...errors,
  //       erPulses: "Τιμή εκτός ορίων. 40 < Παλμοί < 220.",
  //     }));
  //   } else {
  //     setError((errors) => ({
  //       ...errors,
  //       erPulses: "",
  //     }));
  //   }
  //   if (form.temperature < 34 || form.temperature > 43) {
  //     setError((errors) => ({
  //       ...errors,
  //       erTemperature: "Τιμή εκτός ορίων. 34 < Θερμοκρασία < 43",
  //     }));
  //   } else {
  //     setError((errors) => ({
  //       ...errors,
  //       erTemperature: "",
  //     }));
  //   }
  //   if (form.oxygen < 70 || form.oxygen > 100) {
  //     setError((errors) => ({
  //       ...errors,
  //       erOxygen: "Τιμή εκτός ορίων. 70 < Οξυγόνο (%) < 100",
  //     }));
  //   } else {
  //     setError((errors) => ({
  //       ...errors,
  //       erOxygen: "",
  //     }));
  //   }
  //   if (form.sugar < 85 || form.sugar > 350) {
  //     setError((errors) => ({
  //       ...errors,
  //       erSugar: "Τιμή εκτός ορίων. 85 < Σάκχαρο < 300",
  //     }));
  //   } else {
  //     setError((errors) => ({
  //       ...errors,
  //       erSugar: "",
  //     }));
  //   }
  //   if (form.weight < 30 || form.weight > 300) {
  //     setError((errors) => ({
  //       ...errors,
  //       erWeight: "Τιμή εκτός ορίων. 30 < Κιλά < 300",
  //     }));
  //   } else {
  //     setError((errors) => ({
  //       ...errors,
  //       erWeight: "",
  //     }));
  //   }
  // }, [form]);

  const FormHandler = () => {
    setLoading(true);

    if (form.systolic < 50 || form.systolic > 220) {
      setError((errors) => ({
        ...errors,
        erSystolic: "Τιμή εκτός ορίων. 50 < Συστολική Πίεση < 220.",
      }));
    } else {
      setError((errors) => ({
        ...errors,
        erSystolic: "",
      }));
    }
    if (form.diastolic < 30 || form.diastolic > 115) {
      setError((errors) => ({
        ...errors,
        erDiastolic: "Τιμή εκτός ορίων. 30 < Διαστολική Πίεση < 115.",
      }));
    } else {
      setError((errors) => ({
        ...errors,
        erDiastolic: "",
      }));
    }
    if (form.pulses < 40 || form.pulses > 220) {
      setError((errors) => ({
        ...errors,
        erPulses: "Τιμή εκτός ορίων. 40 < Παλμοί < 220.",
      }));
    } else {
      setError((errors) => ({
        ...errors,
        erPulses: "",
      }));
    }
    if (form.temperature < 34 || form.temperature > 43) {
      setError((errors) => ({
        ...errors,
        erTemperature: "Τιμή εκτός ορίων. 34 < Θερμοκρασία < 43",
      }));
    } else {
      setError((errors) => ({
        ...errors,
        erTemperature: "",
      }));
    }
    if (form.oxygen < 70 || form.oxygen > 100) {
      setError((errors) => ({
        ...errors,
        erOxygen: "Τιμή εκτός ορίων. 70 < Οξυγόνο (%) < 100",
      }));
    } else {
      setError((errors) => ({
        ...errors,
        erOxygen: "",
      }));
    }
    if (form.sugar < 85 || form.sugar > 350) {
      setError((errors) => ({
        ...errors,
        erSugar: "Τιμή εκτός ορίων. 85 < Σάκχαρο < 350",
      }));
    } else {
      setError((errors) => ({
        ...errors,
        erSugar: "",
      }));
    }
    if (form.weight < 30 || form.weight > 300) {
      setError((errors) => ({
        ...errors,
        erWeight: "Τιμή εκτός ορίων. 30 < Κιλά < 300",
      }));
    } else {
      setError((errors) => ({
        ...errors,
        erWeight: "",
      }));
    }

    if (errors.erSystolic === undefined) {
      errors.erSystolic = "";
    }
    if (errors.erDiastolic === undefined) {
      errors.erDiastolic = "";
    }
    if (errors.erPulses === undefined) {
      errors.erPulses = "";
    }
    if (errors.erTemperature === undefined) {
      errors.erTemperature = "";
    }
    if (errors.erOxygen === undefined) {
      errors.erOxygen = "";
    }
    if (errors.erSugar === undefined) {
      errors.erSugar = "";
    }
    if (errors.erWeight === undefined) {
      errors.erWeight = "";
    }

    let isValid = false;
    if (
      errors.erSystolic !== "" ||
      errors.erDiastolic !== "" ||
      errors.erPulses !== "" ||
      errors.erTemperature !== "" ||
      errors.erOxygen !== "" ||
      errors.erSugar !== "" ||
      errors.erWeight !== ""
    ) {
      isValid = false;
    } else {
      isValid = true;
      if (form.systolic === undefined) {
        form.systolic = "";
      }
      if (form.diastolic === undefined) {
        form.diastolic = "";
      }
      if (form.pulses === undefined) {
        form.pulses = "";
      }
      if (form.temperature === undefined) {
        form.temperature = "";
      }
      if (form.oxygen === undefined) {
        form.oxygen = "";
      }
      if (form.sugar === undefined) {
        form.sugar = "";
      }
      if (form.weight === undefined) {
        form.weight = "";
      }
      if (form.comments === undefined) {
        form.comments = "";
      }
    }

    let isEmpty = true;

    if (
      form.systolic !== "" ||
      form.diastolic !== "" ||
      form.pulses !== "" ||
      form.temperature !== "" ||
      form.oxygen !== "" ||
      form.sugar !== "" ||
      form.weight !== ""
    ) {
      isEmpty = false;
    } else {
      isEmpty = true;
      alert("Modal Pop-Up. Fill all the necessary input fields");
    }

    if (!isEmpty && isValid) {
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
      alert("Data write: Success");
    } else {
      alert("Data write: Fail");
    }

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
              value={form.systolic}
              onChange={(e) =>
                setForm((form) => ({ ...form, systolic: e.target.value }))
              }
              onInput={
                errors.erSystolic > 40
                  ? setError((errors) => ({ ...errors, erSystolic: "" }))
                  : null
              }
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
              onChange={(e) =>
                setForm((form) => ({ ...form, diastolic: e.target.value }))
              }
              onInput={() =>
                setError((errors) => ({ ...errors, erDiastolic: "" }))
              }
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
              onChange={(e) =>
                setForm((form) => ({ ...form, pulses: e.target.value }))
              }
              onInput={() =>
                setError((errors) => ({ ...errors, erPulses: "" }))
              }
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
              onChange={(e) =>
                setForm((form) => ({ ...form, temperature: e.target.value }))
              }
              onInput={() =>
                setError((errors) => ({ ...errors, erTemperature: "" }))
              }
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
              onChange={(e) =>
                setForm((form) => ({ ...form, oxygen: e.target.value }))
              }
              onInput={() =>
                setError((errors) => ({ ...errors, erOxygen: "" }))
              }
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
              onChange={(e) =>
                setForm((form) => ({ ...form, sugar: e.target.value }))
              }
              onInput={() => setError((errors) => ({ ...errors, erSugar: "" }))}
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
              onChange={(e) =>
                setForm((form) => ({ ...form, weight: e.target.value }))
              }
              onInput={() =>
                setError((errors) => ({ ...errors, erWeight: "" }))
              }
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
              onChange={(e) =>
                setForm((form) => ({ ...form, comments: e.target.value }))
              }
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
