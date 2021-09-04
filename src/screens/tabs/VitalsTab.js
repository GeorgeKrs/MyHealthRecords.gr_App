import TablePressure from "../../general/TablePressure";
import TableTemperature from "../../general/TableTemperature";
import VitalsForm from "../../Forms/VitalsForm";

const VitalsTab = () => {
  return (
    <div className="p-2 outer-tabsDiv w-100 d-flex flex-column align-items-center">
      <div className="mt-4">
        <u>
          <b>
            <h4 className="text-center">Μέτρηση Ζωτικών Λειτουργιών</h4>
          </b>
        </u>
      </div>

      <VitalsForm />

      {/* <div className="mt-5 p-2">
        <h4>
          Πίνακες με ενδεικτικές φυσιολογικές τιμές για τις πιέσεις (Συστολική,
          Διαστολική) και τη Θερμοκρασία.
        </h4>
        <div className="mt-5 mb-5">
          <TablePressure />
        </div>
        <div className="mt-5">
          <TableTemperature />
        </div>
      </div> */}
    </div>
  );
};

export default VitalsTab;
