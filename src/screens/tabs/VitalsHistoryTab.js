import VitalsHistoryForm from "../../Forms/VitalsHistoryForm";
import TabTitles from "../../general/TabTitles";

const VitalsHistoryTab = () => {
  return (
    <div className="p-2 outer-tabsDiv w-100 d-flex flex-column align-items-center">
      <TabTitles title={"Ιστορικό Ζωτικών Λειτουργιών"} />
      <VitalsHistoryForm />
    </div>
  );
};

export default VitalsHistoryTab;
