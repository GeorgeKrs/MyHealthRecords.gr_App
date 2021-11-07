import AverageComp from "../metricsModals/AverageComp";

const AverageVitalsModal = (props) => {
  return (
    <div className="">
      <div className="row">
        <div className="offset-lg-2 offset-md-2 col-lg-2 col-sm-12">
          <AverageComp
            color={"primary"}
            text={"140"}
            header={"Συστολική Πίεση (mmHg)"}
          />
        </div>
        <div className="offset-lg-1 offset-md-1 col-lg-2 col-sm-12">
          <AverageComp
            color={"success"}
            text={"100"}
            header={"Διαστολική Πίεση (mmHg)"}
          />
        </div>
        <div className="offset-lg-1 offset-md-1 col-lg-2 col-sm-12">
          <AverageComp color={"dark"} text={"69.5"} header={"Παλμοί (bpm)"} />
        </div>
      </div>
      <div className="row">
        <div className="offset-lg-2 offset-md-2 col-lg-2 col-sm-12">
          <AverageComp color={"danger"} text={"36.7"} header={"Θερμοκρασία"} />
        </div>
        <div className="offset-lg-1 offset-md-1 col-lg-2 col-sm-12">
          <AverageComp color={"warning"} text={"98.5"} header={"Οξυγόνο (%)"} />
        </div>
        <div className="offset-lg-1 offset-md-1 col-lg-2 col-sm-12">
          <AverageComp color={"info"} text={"88.5"} header={"Βάρος (kg)"} />
        </div>
      </div>
    </div>
  );
};

export default AverageVitalsModal;
