import VitalsHistoryForm from "../../Forms/VitalsHistoryForm";

const VitalsHistoryTab = () => {
  return (
    <div className="p-2 outer-tabsDiv w-100 d-flex flex-column align-items-center">
      <div className="mt-4">
        <u>
          <b>
            <h4 className="text-center">Ιστορικό Ζωτικών Λειτουργιών</h4>
          </b>
        </u>
      </div>

      <VitalsHistoryForm />
    </div>
  );
};

export default VitalsHistoryTab;
