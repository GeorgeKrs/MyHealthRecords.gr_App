const Navbar = (props) => {
  return (
    <div className="p-3 d-flex flex-shrink-1 flex-column text-center mb-3 h-100">
      <div className="p-3 mt-2 ">
        <button className="btn btn-outline-primary w-100">
          {props.FontIconClass[0]}
        </button>
      </div>
      <div className="p-3 mt-2">
        <button className="btn btn-outline-primary w-100">
          {props.FontIconClass[1]}
        </button>
      </div>
      <div className="p-3 mt-2">
        <button className="btn btn-outline-primary w-100">
          {props.FontIconClass[2]}
        </button>
      </div>
      <div className="p-3 mt-2">
        <button className="btn btn-outline-primary w-100">
          {props.FontIconClass[3]}
        </button>
      </div>
      <div className="p-3 mt-2">
        <button className="btn btn-outline-primary w-100">
          {props.FontIconClass[4]}
        </button>
      </div>
      <div className="p-3 mt-2">
        <button className="btn btn-outline-primary w-100">
          {props.FontIconClass[5]}
        </button>
      </div>
      <div className="p-3 mt-2">
        <button className="btn btn-outline-primary w-100">
          {props.FontIconClass[6]}
        </button>
      </div>
      <div className="p-3 mt-2">
        <button className="btn btn-outline-primary w-100">
          {props.FontIconClass[7]}
        </button>
      </div>
      <div className="mt-auto p-3 mt-2">
        <button className="btn btn-outline-primary w-100">
          {props.FontIconClass[8]}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
