import VitalsHistoryForm from "../../Forms/VitalsHistoryForm";
import TabTitles from "../../general/TabTitles";

const VitalsHistoryTab = (props) => {
  return (
    <div className="p-2 outer-tabsDiv w-100 ">
      <TabTitles title={"Ιστορικό Ζωτικών Λειτουργιών"} />
      <VitalsHistoryForm loggedInUser={props.loggedInUser} />
    </div>
  );
};

export default VitalsHistoryTab;
