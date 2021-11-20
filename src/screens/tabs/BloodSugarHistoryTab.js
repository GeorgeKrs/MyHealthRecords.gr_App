import BloodHistoryForm from "../../Forms/BloodHistoryForm";
import TabTitles from "../../general/TabTitles";

const BloodSugarHistoryTab = (props) => {
  return (
    <div className="p-2 outer-tabsDiv w-100 ">
      <TabTitles title={"Ιστορικό Μετρήσεων Σακχάρου"} />
      <BloodHistoryForm loggedInUser={props.loggedInUser} />
    </div>
  );
};

export default BloodSugarHistoryTab;
