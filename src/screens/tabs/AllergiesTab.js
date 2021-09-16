import AllergiesForm from "../../Forms/AllergiesForm";
import TabTitles from "../../general/TabTitles";

const AllergiesTab = (props) => {
  return (
    <div className="p-2 outer-tabsDiv w-100 d-flex flex-column align-items-center">
      <TabTitles title={"Φόρμα Αλλεργιών"} />
      <AllergiesForm loggedInUser={props.loggedInUser} />
    </div>
  );
};

export default AllergiesTab;
