import PDFForm from "../../Forms/PDFForm";
import TabTitles from "../../general/TabTitles";

const PDFTab = () => {
  return (
    <div className="p-2 outer-tabsDiv w-100 d-flex flex-column align-items-center">
      <TabTitles title={"Αποθήκευση νέων εξετάσεων"} />
      <PDFForm />
    </div>
  );
};

export default PDFTab;
