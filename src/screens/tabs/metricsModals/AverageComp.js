// font icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AverageComp = (props) => {
  return (
    <div className={`card text-center border-${props.color} mt-5`}>
      <div className="card-header">{props.header}</div>

      {props.loadingState ? (
        <div
          className={`spinner-border text-${props.color} mx-auto py-2 mt-3 mb-3`}
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className={`card-body text-${props.color}`}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <p className="card-text">
                <FontAwesomeIcon size="lg" icon={props.icon} />
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <p className="card-text">{props.text}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AverageComp;
