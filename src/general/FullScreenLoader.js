const FullScreenLoader = (props) => {
  return (
    <div className="loader-outerdiv d-flex flex-column align-items-center">
      <div className="spinner-grow"></div>
      <div>
        <h5>{props.LoadingMsg || "Παρακαλώ Περιμένετε..."}</h5>
      </div>
    </div>
  );
};

export default FullScreenLoader;
