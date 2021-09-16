import { useState } from "react";
import Tooltip from "../general/Tooltip";
// font icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICONS_ALLERGIES_TAB } from "../icons/icons";
// firebase
import { db } from "../utils/firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";

const CheckBoxes = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [textArea, setTextArea] = useState("");

  const [loading, setLoading] = useState(false);

  let UnCheck_data = {};

  const checkHandler = (event) => {
    if (event) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
      setIsSaved(false);
      setTextArea("");

      switch (props.boxid) {
        case "1":
          UnCheck_data = {
            food_allergies: false,
            food_comments: "",
            LastModification: Timestamp.fromDate(new Date()),
          };
          break;
        case "2":
          UnCheck_data = {
            breathe_allergies: false,
            breathe_comments: "",
            LastModification: Timestamp.fromDate(new Date()),
          };
          break;
        case "3":
          UnCheck_data = {
            sking_allergies: false,
            skin_comments: "",
            LastModification: Timestamp.fromDate(new Date()),
          };
          break;
        case "4":
          UnCheck_data = {
            sting_allergies: false,
            sting_comments: "",
            LastModification: Timestamp.fromDate(new Date()),
          };
          break;
        case "5":
          UnCheck_data = {
            drug_allergies: false,
            drug_comments: "",
            LastModification: Timestamp.fromDate(new Date()),
          };
          break;
        case "6":
          UnCheck_data = {
            other_allergies: false,
            other_comments: "",
            LastModification: Timestamp.fromDate(new Date()),
          };
          break;
      }
      alert("API CALL success modal (set to false Uncheck values");
      const userEmail = props.loggedInUser;
      const AllergiesRef = doc(db, "allergiesRecords", userEmail);
      setDoc(AllergiesRef, UnCheck_data, { merge: true });
    }
  };

  const infoHandler = (id) => {
    let Check_data = {};
    if (isChecked) {
      // check the inbox id
      switch (props.boxid) {
        case "1":
          Check_data = {
            food_allergies: true,
            food_comments: textArea,
            LastModification: Timestamp.fromDate(new Date()),
          };
          break;
        case "2":
          Check_data = {
            breathe_allergies: true,
            breathe_comments: textArea,
            LastModification: Timestamp.fromDate(new Date()),
          };
          break;
        case "3":
          Check_data = {
            sking_allergies: true,
            skin_comments: textArea,
            LastModification: Timestamp.fromDate(new Date()),
          };
          break;
        case "4":
          Check_data = {
            sting_allergies: true,
            sting_comments: textArea,
            LastModification: Timestamp.fromDate(new Date()),
          };
          break;
        case "5":
          Check_data = {
            drug_allergies: true,
            drug_comments: textArea,
            LastModification: Timestamp.fromDate(new Date()),
          };
          break;
        case "6":
          Check_data = {
            other_allergies: true,
            other_comments: textArea,
            LastModification: Timestamp.fromDate(new Date()),
          };
          break;
      }
      if (id === "1") {
        setIsSaved(true);
        alert("API CALL success modal");
        const userEmail = props.loggedInUser;
        const AllergiesRef = doc(db, "allergiesRecords", userEmail);
        setDoc(AllergiesRef, Check_data, { merge: true });
      } else {
        alert("API CALL FAILED modal");
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
