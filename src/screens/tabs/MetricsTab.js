import TabTitles from "../../general/TabTitles";
import GraphVitalsModal from "./metricsModals/GraphVitalsModal";
import AverageVitalsModal from "./metricsModals/AverageVitalsModal";

const MetricsTab = (props) => {
  const loggedInUser = props.loggedInUser;

  return (
    <div className="p-2 w-100 d-flex flex-column align-items-md-center">
      <TabTitles title={"Στατιστικά Μετρήσεων Ζωτικών Λειτουργιών"} />
      <div className="mt-5 mb-5 w-100">
        <AverageVitalsModal />
      </div>
      <div className="mx-auto mt-5 mb-5 w-100">
        <GraphVitalsModal />
      </div>
    </div>
  );
};

export default MetricsTab;
