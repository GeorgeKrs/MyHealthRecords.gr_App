const Gutters = (props) => {
  return (
    <div class="col">
      <div class={`p-3 border + ${props.gutterColor || "bg-light"}`}>
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
