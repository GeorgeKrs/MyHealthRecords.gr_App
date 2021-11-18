const Gutters = (props) => {
  return (
    <div className="col">
      <div
        className={`p-3 border rounded bg-light + ${
          props.gutterBorderColor || "border-dark"
        }`}
      >
        {props.loadingState ? (
          <div
            className={`mx-auto d-flex spinner-border text-primary mx-auto py-2 mt-3 mb-3`}
          >
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div>
            <h6 className={props.gutterColor || "text-dark"}>
              {props.gutterTitle}:
            </h6>
            <h6 className={props.gutterColor || "text-dark"}>
              Μέγιστη Τιμή: {props.gutterMax}
            </h6>
            <h6 className={props.gutterColor || "text-dark"}>
              Ελάχιστη Τιμή: {props.gutterMin}
            </h6>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gutters;
