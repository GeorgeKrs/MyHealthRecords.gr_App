import { useState } from "react";
import Tooltip from "../general/Tooltip";
// font icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICONS_ALLERGIES_TAB } from "../icons/icons";

const CheckBoxes = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [textArea, setTextArea] = useState("");
  const [loading, setLoading] = useState(false);

  const checkHandler = (event) => {
    if (event) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
      setIsSaved(false);
      setTextArea("");
    }
  };

  const infoHandler = (id) => {
    if (isChecked) {
      if (id === "1") {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    } else {
      setIsChecked(false);
      setIsSaved(false);
    }
  };

  return (
    <div>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id={props.boxid}
          checked={isChecked}
          onChange={(e) => checkHandler(e.target.checked)}
        />
        <label className="label">{props.label}</label>
      </div>

      <div className="mt-2 mb-4">
        <textarea
          className="form-control"
          rows={isChecked ? (isSaved ? "1" : "3") : "1"}
          placeholder={
            `Περισσότερες πληροφορίες για ` + props.allergyDescription
          }
          value={textArea}
          onChange={(e) => setTextArea(e.target.value)}
          disabled={isChecked ? (isSaved ? true : false) : true}
        ></textarea>
        <div className="pt-2 d-inline-flex text-center">
          <div className="">
            <Tooltip
              direction={"bottom"}
              content={ICONS_ALLERGIES_TAB[0].description}
            >
              <button
                type="button"
                className="btn btn-sm btn-primary"
                disabled={isChecked ? (isSaved ? true : false) : true}
                onClick={infoHandler.bind(this, ICONS_ALLERGIES_TAB[0].id)}
              >
                <FontAwesomeIcon
                  id={"1"}
                  className=""
                  icon={ICONS_ALLERGIES_TAB[0].icon}
                  size="lg"
                />
              </button>
            </Tooltip>
          </div>
          <div className="ms-2">
            <Tooltip content={ICONS_ALLERGIES_TAB[1].description}>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                disabled={isChecked ? (isSaved ? false : true) : true}
                onClick={infoHandler.bind(this, ICONS_ALLERGIES_TAB[1].id)}
              >
                <FontAwesomeIcon
                  id={"1"}
                  className=""
                  icon={ICONS_ALLERGIES_TAB[1].icon}
                  size="lg"
                />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckBoxes;
