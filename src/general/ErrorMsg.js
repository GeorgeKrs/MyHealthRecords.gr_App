const ErrorMsg = (props) => {
  return (
    <>
      <h6 style={{ fontSize: "12px" }} className="mb-0 text-danger">
        {props.ErrorMsg}
      </h6>
    </>
  );
};
export default ErrorMsg;
