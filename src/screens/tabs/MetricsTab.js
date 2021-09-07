import MetricsTable from "../../metrics/MetricsTable";
import LastSearchTests from "../../metrics/LastSearchTests";
import LastSavedTests from "../../metrics/LastSavedTests";
import TabTitles from "../../general/TabTitles";

const MetricsTab = () => {
  return (
    <div className="p-2 outer-tabsDiv w-100 d-flex flex-column align-items-center">
      <TabTitles title={"Στατιστικά λογαριασμού"} />
      <MetricsTable />
    </div>
  );
};

export default MetricsTab;
