import PDFForm from "../../Forms/PDFForm";

const PDFTab = () => {
  return (
    <div className="p-2 outer-VitalsDiv w-100 d-flex flex-column align-items-center">
      <div className="mt-4">
        <h3>Αποθήκευση νέων εξετάσεων</h3>
      </div>

      <PDFForm />
    </div>
  );
};

export default PDFTab;
