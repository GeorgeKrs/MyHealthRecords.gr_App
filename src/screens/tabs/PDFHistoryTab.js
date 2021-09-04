import PDFHistoryForm from "../../Forms/PDFHistoryForm";

const VitalsHistoryTab = () => {
  return (
    <div className="p-2 outer-VitalsDiv w-100 d-flex flex-column align-items-center">
      <div className="mt-4">
        <u>
          <b>
            <h4 className="text-center">Ιστορικό Αποτελεσμάτων Εξετάσεων</h4>
          </b>
        </u>
      </div>

      <PDFHistoryForm />
    </div>
  );
};

export default VitalsHistoryTab;
