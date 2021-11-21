import TabTitles from "../../general/TabTitles";
import GraphVitalsModal from "./metricsModals/GraphVitalsModal";
import AverageVitalsModal from "./metricsModals/AverageVitalsModal";
import SugarGraphModal from "./metricsModals/SugarGraphModal";

const MetricsTab = (props) => {
  return (
    <div
      className="p-2 w-100 h-100 d-flex flex-column"
      style={{ overflow: "hidden", maxWidth: "100vw" }}
    >
      <TabTitles title={"Στατιστικά Όλων των Μετρήσεων"} />
      <div className="mt-5 mb-5 w-100">
        <AverageVitalsModal loggedInUser={props.loggedInUser} />
      </div>
      <div className="mx-auto mt-5 mb-5 w-100">
        <GraphVitalsModal loggedInUser={props.loggedInUser} />
      </div>
      <div className="mx-auto mt-5 mb-5 w-100">
        <SugarGraphModal loggedInUser={props.loggedInUser} />
      </div>
    </div>
  );
};

export default MetricsTab;
