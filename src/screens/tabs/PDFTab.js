import PDFForm from "../../Forms/PDFForm";
import TabTitles from "../../general/TabTitles";

const PDFTab = (props) => {
  return (
    <div className="p-2 outer-tabsDiv w-100 d-flex flex-column align-items-center">
      <TabTitles title={"Αποθήκευση νέων εξετάσεων"} />
      <PDFForm loggedInUser={props.loggedInUser} />
    </div>
  );
};

export default PDFTab;
