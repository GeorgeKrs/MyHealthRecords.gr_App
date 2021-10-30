import { useState, useEffect } from "react";
import CheckBoxes from "../general/CheckBoxes";
import "./form.css";
// Firestore
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import FullScreenLoader from "../general/FullScreenLoader";

const AllergiesForm = (props) => {
  const [userData, setUserData] = useState({});

  const [loading, setLoading] = useState(true);

  const loggedInUser = props.loggedInUser;

  const fetchUserData = async () => {
    const docRef = doc(db, "allergiesRecords", loggedInUser);
    const docSnap = await getDoc(docRef);
    setUserData(docSnap.data());
  };

  useEffect(() => {
    fetchUserData().finally(
      setTimeout(function () {
        setLoading(false);
      }, 400)
    );
  });
  return (
    <div className="pt-4 mb-4">
      {loading ? (
        <FullScreenLoader setFullscreen={true} />
      ) : (
        <div className="form-custom">
          <p>
            <b>
              Παρακαλώ επιλέξτε τις κατηγορίες των αλλεργιών που αντιμετωπίζετε.
            </b>
          </p>
          <p className="mb-4 blockquote-footer">
            <b>Οι περιγραφές από κάτω είναι προαιρετικές.</b>
          </p>

          <CheckBoxes
            label={"Τροφικές αλλεργίες"}
            allergyDescription={"τις τροφικές σας αλλεργίες"}
            boxid={"1"}
            loggedInUser={props.loggedInUser}
            isCheckedValue={
              userData.food_allergies === null ||
              userData.food_allergies === undefined ||
              userData.food_allergies === false
                ? false
                : true
            }
            textAreaValue={
              userData.food_comments === null ||
              userData.food_comments === undefined
                ? ""
                : userData.food_comments
            }
            isSavedValue={userData.food_allergies ? true : false}
          />
          <CheckBoxes
            label={"Αναπνευστικές αλλεργίες"}
            allergyDescription={"τις αναπνευστικές σας αλλεργίες"}
            boxid={"2"}
            loggedInUser={props.loggedInUser}
            isCheckedValue={
              userData.breathe_allergies === null ||
              userData.breathe_allergies === undefined ||
              userData.breathe_allergies === false
                ? false
                : true
            }
            textAreaValue={
              userData.breathe_comments === null ||
              userData.breathe_comments === undefined
                ? ""
                : userData.breathe_comments
            }
            isSavedValue={userData.breathe_allergies ? true : false}
          />
          <CheckBoxes
            label={"Δερματικές αλλεργίες"}
            allergyDescription={"τις δερματικές σας αλλεργίες"}
            boxid={"3"}
            loggedInUser={props.loggedInUser}
            isCheckedValue={
              userData.skin_allergies === null ||
              userData.skin_allergies === undefined ||
              userData.skin_allergies === false
                ? false
                : true
            }
            textAreaValue={
              userData.skin_comments === null ||
              userData.skin_comments === undefined
                ? ""
                : userData.skin_comments
            }
            isSavedValue={userData.skin_allergies ? true : false}
          />
          <CheckBoxes
            label={"Αλλεργίες σε υμενόπτερα (Μέλισσες, Σφήγκες κτλπ)"}
            allergyDescription={"τις αλλεργίες σας σε υμενόπτερα"}
            boxid={"4"}
            loggedInUser={props.loggedInUser}
            isCheckedValue={
              userData.sting_allergies === null ||
              userData.sting_allergies === undefined ||
              userData.sting_allergies === false
                ? false
                : true
            }
            textAreaValue={
              userData.sting_comments === null ||
              userData.sting_comments === undefined
                ? ""
                : userData.sting_comments
            }
            isSavedValue={userData.sting_allergies ? true : false}
          />
          <CheckBoxes
            label={"Αλλεργίες σε φάρμακα"}
            allergyDescription={"τις αλλεργίες σας σε φάρμακα"}
            boxid={"5"}
            loggedInUser={props.loggedInUser}
            isCheckedValue={
              userData.drug_allergies === null ||
              userData.drug_allergies === undefined ||
              userData.drug_allergies === false
                ? false
                : true
            }
            textAreaValue={
              userData.drug_comments === null ||
              userData.drug_comments === undefined
                ? ""
                : userData.drug_comments
            }
            isSavedValue={userData.drug_allergies ? true : false}
          />
          <CheckBoxes
            label={"Άλλες αλλεργίες"}
            allergyDescription={"τις αλλεργίες σας σε άλλα"}
            boxid={"6"}
            loggedInUser={props.loggedInUser}
            isCheckedValue={
              userData.other_allergies === null ||
              userData.other_allergies === undefined ||
              userData.other_allergies === false
                ? false
                : true
            }
            textAreaValue={
              userData.other_comments === null ||
              userData.other_comments === undefined
                ? ""
                : userData.other_comments
            }
            isSavedValue={userData.other_allergies ? true : false}
          />
        </div>
      )}
    </div>
  );
};

export default AllergiesForm;
