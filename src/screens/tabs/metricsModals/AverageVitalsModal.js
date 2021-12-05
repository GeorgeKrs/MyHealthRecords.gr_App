import AverageComp from "../metricsModals/AverageComp";
import { ICONS_METRICS_TAB } from "../../../icons/icons";

const AverageVitalsModal = (props) => {
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
            text={props.systolicAv}
            header={"Συστολική Πίεση (mmHg)"}
            icon={ICONS_METRICS_TAB[0].icon}
            loadingState={props.loading}
          />
        </div>
        <div className="offset-lg-1 offset-md-1 col-lg-2 col-md-10 col-sm-12">
          <AverageComp
            color={"warning"}
            text={props.diastolicAv}
            header={"Διαστολική Πίεση (mmHg)"}
            icon={ICONS_METRICS_TAB[0].icon}
            loadingState={props.loading}
          />
        </div>
        <div className="offset-lg-1 offset-md-1 col-lg-2 col-md-10 col-sm-12">
          <AverageComp
            color={"danger"}
            text={props.pulsesAv}
            header={"Παλμοί (bpm)"}
            icon={ICONS_METRICS_TAB[1].icon}
            loadingState={props.loading}
          />
        </div>
      </div>
      <div className="row">
        <div className="offset-lg-2 offset-md-1 col-lg-2 col-md-10 col-sm-12">
          <AverageComp
            color={"primary"}
            text={props.temperatureAv}
            header={"Θερμοκρασία (" + String.fromCharCode(176) + "C)"}
            icon={ICONS_METRICS_TAB[2].icon}
            loadingState={props.loading}
          />
        </div>
        <div className="offset-lg-1 offset-md-1 col-lg-2 col-md-10 col-sm-12">
          <AverageComp
            color={"success"}
            text={props.oxygenAv}
            header={"Οξυγόνο (%)"}
            icon={ICONS_METRICS_TAB[3].icon}
            loadingState={props.loading}
          />
        </div>
        <div className="offset-lg-1 offset-md-1 col-lg-2 col-md-10 col-sm-12">
          <AverageComp
            color={"info"}
            text={props.weightAv}
            header={"Βάρος (kg)"}
            icon={ICONS_METRICS_TAB[4].icon}
            loadingState={props.loading}
          />
        </div>
      </div>
    </div>
  );
};

export default AverageVitalsModal;
