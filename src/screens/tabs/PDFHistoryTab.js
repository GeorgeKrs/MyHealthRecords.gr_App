import PDFHistoryForm from "../../Forms/PDFHistoryForm";
import TabTitles from "../../general/TabTitles";

const VitalsHistoryTab = (props) => {
  return (
    <div className="p-2 outer-tabsDiv w-100 d-flex flex-column align-items-center">
      <TabTitles title={"Ιστορικό Αποτελεσμάτων Εξετάσεων"} />
      <PDFHistoryForm loggedInUser={props.loggedInUser} />
    </div>
  );
};

export default VitalsHistoryTab;
