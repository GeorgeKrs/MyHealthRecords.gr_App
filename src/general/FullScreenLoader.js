const FullScreenLoader = (props) => {
  return (
    <div
      className={
        props.setFullscreen === false
          ? "mt-5 d-flex flex-column align-items-center"
          : "loader-outerdiv d-flex flex-column align-items-center"
      }
    >
      <div className="spinner-grow"></div>
      <div>
        <h5>{props.LoadingMsg || "Παρακαλώ Περιμένετε..."}</h5>
      </div>
    </div>
  );
};

export default FullScreenLoader;
