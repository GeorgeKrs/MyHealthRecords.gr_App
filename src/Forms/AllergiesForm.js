import CheckBoxes from "../general/CheckBoxes";
import "./form.css";

const AllergiesForm = (props) => {
  return (
    <div className="pt-4 mb-4">
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
        />
        <CheckBoxes
          label={"Αναπνευστικές αλλεργίες"}
          allergyDescription={"τις αναπνευστικές σας αλλεργίες"}
          boxid={"2"}
          loggedInUser={props.loggedInUser}
        />
        <CheckBoxes
          label={"Δερματικές αλλεργίες"}
          allergyDescription={"τις δερματικές σας αλλεργίες"}
          boxid={"3"}
          loggedInUser={props.loggedInUser}
        />
        <CheckBoxes
          label={"Αλλεργίες σε υμενόπτερα (Μέλισσες, Σφήγκες κτλπ)"}
          allergyDescription={"τις αλλεργίες σας σε υμενόπτερα"}
          boxid={"4"}
          loggedInUser={props.loggedInUser}
        />
        <CheckBoxes
          label={"Αλλεργίες σε φάρμακα"}
          allergyDescription={"τις αλλεργίες σας σε φάρμακα"}
          boxid={"5"}
          loggedInUser={props.loggedInUser}
        />
        <CheckBoxes
          label={"Άλλες αλλεργίες"}
          allergyDescription={"τις αλλεργίες σας σε άλλα"}
          boxid={"6"}
          loggedInUser={props.loggedInUser}
        />
      </div>
    </div>
  );
};

export default AllergiesForm;
