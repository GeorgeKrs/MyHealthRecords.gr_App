import { useState, useEffect } from "react";
import TabTitles from "../../general/TabTitles";
import GraphVitalsModal from "./metricsModals/GraphVitalsModal";
import AverageVitalsModal from "./metricsModals/AverageVitalsModal";
import SugarGraphModal from "./metricsModals/SugarGraphModal";
// firestore
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../utils/firebase";

const MetricsTab = (props) => {
  const loggedInUser = props.loggedInUser;

  const [loading, setLoading] = useState(true);
  const [systolicAv, setSystolicAv] = useState(null);
  const [diastolicAv, setDiastolicAv] = useState(null);
  const [pulsesAv, setPulsesAv] = useState(null);
  const [temperatureAv, setTemperatureAv] = useState(null);
  const [oxygenAv, setOxygenAv] = useState(null);
  const [weightAv, setWeightAv] = useState(null);

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
    fetchAverages().then(
      setTimeout(() => {
        setLoading(false);
      }, 300)
    );
  }, []);

  return (
    <div
      className="p-2 w-100 h-100 d-flex flex-column"
      style={{ overflow: "hidden", maxWidth: "100vw" }}
    >
      <TabTitles title={"Στατιστικά Όλων των Μετρήσεων"} />
      <div className="mt-5 mb-5 w-100">
        <AverageVitalsModal
          loggedInUser={loggedInUser}
          loading={loading}
          systolicAv={systolicAv}
          diastolicAv={diastolicAv}
          pulsesAv={pulsesAv}
          temperatureAv={temperatureAv}
          oxygenAv={oxygenAv}
          weightAv={weightAv}
        />
      </div>
      <div className="mx-auto mt-5 mb-5 w-100">
        <GraphVitalsModal
          loggedInUser={loggedInUser}
          loading={loading}
          systolicAv={systolicAv}
          diastolicAv={diastolicAv}
          pulsesAv={pulsesAv}
          temperatureAv={temperatureAv}
          oxygenAv={oxygenAv}
          weightAv={weightAv}
        />
      </div>
      <div className="mx-auto mt-5 mb-5 w-100">
        <SugarGraphModal loggedInUser={props.loggedInUser} />
      </div>
    </div>
  );
};

export default MetricsTab;
