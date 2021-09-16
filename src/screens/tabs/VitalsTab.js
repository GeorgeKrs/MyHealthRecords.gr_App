import TablePressure from "../../general/TablePressure";
import TableTemperature from "../../general/TableTemperature";
import VitalsForm from "../../Forms/VitalsForm";
import TabTitles from "../../general/TabTitles";

const VitalsTab = (props) => {
  return (
    <div className="p-2 outer-tabsDiv w-100 d-flex flex-column align-items-center">
      <TabTitles title={"Μέτρηση Ζωτικών Λειτουργιών"} />
      <VitalsForm loggedInUser={props.loggedInUser} />

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
