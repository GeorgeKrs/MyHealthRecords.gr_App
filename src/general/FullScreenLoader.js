const FullScreenLoader = (props) => {
  return props.setNotFullscreen === true ? (
    <div className="mt-4 d-flex flex-column align-items-center">
      <div className="spinner-grow"></div>
      <div>
        <h5>{props.LoadingMsg || "Παρακαλώ Περιμένετε..."}</h5>
      </div>
    </div>
  ) : (
    <div className="loader-outerdiv d-flex flex-column align-items-center">
      <div className="spinner-grow"></div>
      <div>
        <h5>{props.LoadingMsg || "Παρακαλώ Περιμένετε..."}</h5>
      </div>
    </div>
  );
};

export default FullScreenLoader;
