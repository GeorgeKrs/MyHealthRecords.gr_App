import { useState } from "react";
import CheckBoxes from "../general/CheckBoxes";
import "./form.css";

const AllergiesForm = () => {
  const [loading, setLoading] = useState(false);

  const FormHandler = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

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
        />
        <CheckBoxes
          label={"Αναπνευστικές αλλεργίες"}
          allergyDescription={"τις αναπνευστικές σας αλλεργίες"}
          boxid={"2"}
        />
        <CheckBoxes
          label={"Δερματικές αλλεργίες"}
          allergyDescription={"τις δερματικές σας αλλεργίες"}
          boxid={"3"}
        />
        <CheckBoxes
          label={"Αλλεργίες σε υμενόπτερα (Μέλισσες, Σφήγκες κτλπ)"}
          allergyDescription={"τις αλλεργίες σας σε υμενόπτερα"}
          boxid={"4"}
        />
        <CheckBoxes
          label={"Αλλεργίες σε φάρμακα"}
          allergyDescription={"τις αλλεργίες σας σε φάρμακα"}
          boxid={"5"}
        />
        <CheckBoxes
          label={"Άλλες αλλεργίες"}
          allergyDescription={"τις αλλεργίες σας σε άλλα"}
          boxid={"6"}
        />

        <div className="mt-5">
          {/* <button
            type="button"
            className="btn btn-outline-primary"
            onClick={FormHandler}
            disabled={loading ? true : false}
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
            )}
            <span>{loading ? "Περιμένετε..." : "Αποθήκευση"}</span>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default AllergiesForm;
