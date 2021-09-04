import PDFForm from "../../Forms/PDFForm";

const PDFTab = () => {
  return (
    <div className="p-2 outer-tabsDiv w-100 d-flex flex-column align-items-center">
      <div className="mt-4">
        <u>
          <b>
            <h4 className="text-center">Αποθήκευση νέων εξετάσεων</h4>
          </b>
        </u>
      </div>

      <PDFForm />
    </div>
  );
};

export default PDFTab;
