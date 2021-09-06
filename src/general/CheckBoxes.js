import { useState } from "react";
import Tooltip from "../general/Tooltip";
// font icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICONS_ALLERGIES_TAB } from "../icons/icons";

const CheckBoxes = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [textArea, setTextArea] = useState("");
  const [loading, setLoading] = useState(false);

  const FormHandler = () => {
    setLoading(true);

    console.log(textArea);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
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
          onChange={(e) => setTextArea(e.target.value)}
          disabled={isChecked ? false : true}
        ></textarea>
        <div className="pt-3 d-inline-flex text-center">
          {ICONS_ALLERGIES_TAB.map((menu_icon) => (
            <div key={menu_icon.id} className="p-2">
              <Tooltip content={menu_icon.description}>
                <button
                  type="button"
                  className={
                    menu_icon.id === "1"
                      ? "btn btn-sm btn-outline-primary"
                      : "btn btn-sm btn-outline-secondary"
                  }
                  onClick="{tabSelectorHandler.bind(this, menu_icon.id)}"
                >
                  <FontAwesomeIcon
                    id={menu_icon.id}
                    className=""
                    icon={menu_icon.icon}
                    size="lg"
                  />
                </button>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// <div className="mt-2">
//   <button
//     type="button"
//     className="btn btn-outline-primary"
//     onClick={FormHandler}
//     disabled={isChecked ? false : true}
//   >
//     {loading && (
//       <span
//         className="spinner-border spinner-border-sm me-2"
//         role="status"
//       ></span>
//     )}
//     {ICONS_ALLERGIES_TAB.icon[1]}
//   </button>
// </div>

export default CheckBoxes;
