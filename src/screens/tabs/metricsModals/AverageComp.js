const AverageComp = (props) => {
  return (
    <div className={`card text-center border-${props.color} mt-5`}>
      <div className="card-header">{props.header}</div>
      <div className={`card-body text-${props.color}`}>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <p className="card-text">ΕΙΚΟΝΑ</p>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <p className="card-text">{props.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AverageComp;
