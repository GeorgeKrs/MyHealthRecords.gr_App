import { useState } from "react";

const CheckBoxes = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id={props.boxid}
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <label className="label">{props.label}</label>
      </div>
      <div className="mt-2 mb-4">
        <textarea
          className="form-control"
          rows={isChecked ? "3" : "1"}
          placeholder={
            `Περισσότερες πληροφορίες για ` + props.allergyDescription
          }
          disabled={isChecked ? false : true}
        ></textarea>
      </div>
    </div>
  );
};

export default CheckBoxes;
