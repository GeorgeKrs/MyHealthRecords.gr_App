import VitalsHistoryForm from "../../Forms/VitalsHistoryForm";

const VitalsHistoryTab = () => {
  return (
    <div className="p-2 outer-VitalsDiv w-100 d-flex flex-column align-items-center">
      <div className="mt-4">
        <u>
          <b>
            <h3>Ιστορικό Ζωτικών Λειτουργιών</h3>
          </b>
        </u>
      </div>

      <VitalsHistoryForm />
    </div>
  );
};

export default VitalsHistoryTab;
