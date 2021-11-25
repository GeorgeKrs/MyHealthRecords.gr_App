import TablePressure from "../../general/TablePressure";
import TableTemperature from "../../general/TableTemperature";
import VitalsForm from "../../Forms/VitalsForm";
import TabTitles from "../../general/TabTitles";

const VitalsTab = (props) => {
  return (
    <div className="p-2 outer-tabsDiv w-100 d-flex flex-column align-items-center">
      <TabTitles title={"Μέτρηση Ζωτικών Λειτουργιών"} />
      <VitalsForm loggedInUser={props.loggedInUser} />
    </div>
  );
};

export default VitalsTab;
