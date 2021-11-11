import TabTitles from "../../general/TabTitles";
import DiabetesForm from "../../Forms/DiabetesForm";

const DiabetesTab = (props) => {
  return (
    <div className="p-2 outer-tabsDiv w-100 d-flex flex-column align-items-center">
      <TabTitles title={"Φόρμα Μέτρησης Σακχάρου"} />
      <DiabetesForm loggedInUser={props.loggedInUser} />
    </div>
  );
};

export default DiabetesTab;
