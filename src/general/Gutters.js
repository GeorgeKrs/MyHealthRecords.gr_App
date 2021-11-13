const Gutters = (props) => {
  return (
    <div className="col">
      <div
        className={`p-3 border rounded + ${props.gutterColor || "bg-light"} + ${
          props.gutterBorderColor || "border-dark"
        }`}
      >
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
    </div>
  );
};

export default Gutters;
