import AllergiesForm from "../../Forms/AllergiesForm";
import TabTitles from "../../general/TabTitles";

const AllergiesTab = () => {
  return (
    <div className="p-2 outer-tabsDiv w-100 d-flex flex-column align-items-center">
      <TabTitles title={"Φόρμα Αλλεργιών"} />
      <AllergiesForm />
    </div>
  );
};

export default AllergiesTab;
