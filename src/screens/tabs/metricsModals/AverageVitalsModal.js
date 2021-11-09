import { useState } from "react";
import AverageComp from "../metricsModals/AverageComp";
import { ICONS_METRICS_TAB } from "../../../icons/icons";

const AverageVitalsModal = (props) => {
  return (
    <div className="">
      <div className="row">
        <div className="offset-lg-2 offset-md-1 col-lg-6 col-md-10 col-sm-12">
          <h6>
            <u>Μέσος Όρος Μετρήσεων Ζωτικών Λειτουργιών</u>
          </h6>
        </div>
      </div>
      <div className="row">
        <div className="offset-lg-2 offset-md-1 col-lg-2 col-md-10 col-sm-12">
          <AverageComp
            color={"dark"}
            text={"140"}
            header={"Συστολική Πίεση (mmHg)"}
            icon={ICONS_METRICS_TAB[0].icon}
          />
        </div>
        <div className="offset-lg-1 offset-md-1 col-lg-2 col-md-10 col-sm-12">
          <AverageComp
            color={"warning"}
            text={"100"}
            header={"Διαστολική Πίεση (mmHg)"}
            icon={ICONS_METRICS_TAB[0].icon}
          />
        </div>
        <div className="offset-lg-1 offset-md-1 col-lg-2 col-md-10 col-sm-12">
          <AverageComp
            color={"danger"}
            text={"69.5"}
            header={"Παλμοί (bpm)"}
            icon={ICONS_METRICS_TAB[1].icon}
          />
        </div>
      </div>
      <div className="row">
        <div className="offset-lg-2 offset-md-1 col-lg-2 col-md-10 col-sm-12">
          <AverageComp
            color={"primary"}
            text={"36.7"}
            header={"Θερμοκρασία"}
            icon={ICONS_METRICS_TAB[2].icon}
          />
        </div>
        <div className="offset-lg-1 offset-md-1 col-lg-2 col-md-10 col-sm-12">
          <AverageComp
            color={"success"}
            text={"98.5"}
            header={"Οξυγόνο (%)"}
            icon={ICONS_METRICS_TAB[3].icon}
          />
        </div>
        <div className="offset-lg-1 offset-md-1 col-lg-2 col-md-10 col-sm-12">
          <AverageComp
            color={"info"}
            text={"88.5"}
            header={"Βάρος (kg)"}
            icon={ICONS_METRICS_TAB[4].icon}
          />
        </div>
      </div>
    </div>
  );
};

export default AverageVitalsModal;
