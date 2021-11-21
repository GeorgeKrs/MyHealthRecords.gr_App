import { useState, useEffect } from "react";
import AverageComp from "../metricsModals/AverageComp";
import { ICONS_METRICS_TAB } from "../../../icons/icons";
// firestore
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../../utils/firebase";

const AverageVitalsModal = (props) => {
  const [loading, setLoading] = useState(true);

  const [systolicAv, setSystolicAv] = useState(null);
  const [diastolicAv, setDiastolicAv] = useState(null);
  const [pulsesAv, setPulsesAv] = useState(null);
  const [temperatureAv, setTemperatureAv] = useState(null);
  const [oxygenAv, setOxygenAv] = useState(null);
  const [weightAv, setWeightAv] = useState(null);

  const loggedInUser = props.loggedInUser;

  const year = new Date().getFullYear().toString();
  const day = new Date().getDate().toString();

  const fromMonth = (new Date().getMonth() - 1).toString();
  const toMonth = (new Date().getMonth() + 1).toString();

  function roundNumbers(num) {
    return +(Math.round(num + "e+2") + "e-2");
  }

  const fetchAverages = async () => {
    let sysVal = 0;
    let sysCnt = 0;

    let diasVal = 0;
    let diasCnt = 0;

    let pulVal = 0;
    let pulCnt = 0;

    let tempVal = 0;
    let tempCnt = 0;

    let oxygVal = 0;
    let oxygCnt = 0;

    let weightVal = 0;
    let weightCnt = 0;

    setLoading(true);
    const DateFrom = new Date(year, fromMonth, day, "00", "00", "01");
    const DateTo = new Date(year, toMonth, day, "23", "59", "59");

    const averagesQuery = query(
      collection(db, "vitalsRecords"),
      where("userEmail", "==", loggedInUser),
      where("submitDate", ">=", DateFrom),
      where("submitDate", "<=", DateTo),
      orderBy("submitDate", "desc")
    );
    const querySnapshot = await getDocs(averagesQuery);
    querySnapshot.forEach((doc) => {
      if (doc.data().systolic !== "") {
        sysVal = sysVal + parseFloat(doc.data().systolic);
        sysCnt = sysCnt + 1;
      }

      if (doc.data().diastolic !== "") {
        diasVal = diasVal + parseFloat(doc.data().diastolic);
        diasCnt = diasCnt + 1;
      }

      if (doc.data().pulses !== "") {
        pulVal = pulVal + parseFloat(doc.data().pulses);
        pulCnt = pulCnt + 1;
      }

      if (doc.data().temperature !== "") {
        tempVal = tempVal + parseFloat(doc.data().temperature);
        tempCnt = tempCnt + 1;
      }

      if (doc.data().oxygen !== "") {
        oxygVal = oxygVal + parseFloat(doc.data().oxygen);
        oxygCnt = oxygCnt + 1;
      }

      if (doc.data().weight !== "") {
        weightVal = weightVal + parseFloat(doc.data().weight);
        weightCnt = weightCnt + 1;
      }
    });

    const systolic = roundNumbers(sysVal / sysCnt);
    const diastolic = roundNumbers(diasVal / diasCnt);
    const pulses = roundNumbers(pulVal / pulCnt);
    const temperature = roundNumbers(tempVal / tempCnt);
    const oxygen = roundNumbers(oxygVal / oxygCnt);
    const weight = roundNumbers(weightVal / weightCnt);

    if (systolic === null || systolic === undefined || isNaN(systolic)) {
      setSystolicAv("-");
    } else {
      setSystolicAv(systolic);
    }

    if (diastolic === null || diastolic === undefined || isNaN(diastolic)) {
      setDiastolicAv("-");
    } else {
      setDiastolicAv(diastolic);
    }

    if (pulses === null || pulses === undefined || isNaN(pulses)) {
      setPulsesAv("-");
    } else {
      setPulsesAv(pulses);
    }

    if (
      temperature === null ||
      temperature === undefined ||
      isNaN(temperature)
    ) {
      setTemperatureAv("-");
    } else {
      setTemperatureAv(temperature);
    }

    if (oxygen === null || oxygen === undefined || isNaN(oxygen)) {
      setOxygenAv("-");
    } else {
      setOxygenAv(oxygen);
    }

    if (weight === null || weight === undefined || isNaN(weight)) {
      setWeightAv("-");
    } else {
      setWeightAv(weight);
    }
  };

  useEffect(() => {
    fetchAverages().finally(setLoading(false));
  }, []);

  return (
    <div className="">
      <div className="row">
        <div className="offset-lg-2 offset-md-1 col-lg-6 col-md-10 col-sm-12">
          <h6>
            <b>
              Μέσος Όρος Μετρήσεων Ζωτικών Λειτουργιών (Τελευταίους 3 μήνες)
            </b>
          </h6>
        </div>
      </div>
      <div className="row">
        <div className="offset-lg-2 offset-md-1 col-lg-2 col-md-10 col-sm-12">
          <AverageComp
            color={"dark"}
            text={systolicAv}
            header={"Συστολική Πίεση (mmHg)"}
            icon={ICONS_METRICS_TAB[0].icon}
            loadingState={loading}
          />
        </div>
        <div className="offset-lg-1 offset-md-1 col-lg-2 col-md-10 col-sm-12">
          <AverageComp
            color={"warning"}
            text={diastolicAv}
            header={"Διαστολική Πίεση (mmHg)"}
            icon={ICONS_METRICS_TAB[0].icon}
            loadingState={loading}
          />
        </div>
        <div className="offset-lg-1 offset-md-1 col-lg-2 col-md-10 col-sm-12">
          <AverageComp
            color={"danger"}
            text={pulsesAv}
            header={"Παλμοί (bpm)"}
            icon={ICONS_METRICS_TAB[1].icon}
            loadingState={loading}
          />
        </div>
      </div>
      <div className="row">
        <div className="offset-lg-2 offset-md-1 col-lg-2 col-md-10 col-sm-12">
          <AverageComp
            color={"primary"}
            text={temperatureAv}
            header={"Θερμοκρασία (" + String.fromCharCode(176) + "C)"}
            icon={ICONS_METRICS_TAB[2].icon}
            loadingState={loading}
          />
        </div>
        <div className="offset-lg-1 offset-md-1 col-lg-2 col-md-10 col-sm-12">
          <AverageComp
            color={"success"}
            text={oxygenAv}
            header={"Οξυγόνο (%)"}
            icon={ICONS_METRICS_TAB[3].icon}
            loadingState={loading}
          />
        </div>
        <div className="offset-lg-1 offset-md-1 col-lg-2 col-md-10 col-sm-12">
          <AverageComp
            color={"info"}
            text={weightAv}
            header={"Βάρος (kg)"}
            icon={ICONS_METRICS_TAB[4].icon}
            loadingState={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default AverageVitalsModal;
