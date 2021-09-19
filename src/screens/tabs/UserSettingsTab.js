import { useState } from "react";
import TabTitles from "../../general/TabTitles";
import UserSettingsForm from "../../Forms/UserSettingsForm"; 
import FullscreenLoader from "../../general/FullScreenLoader";

const UserSettingsTab = (props) => {
    return  (
        <div className="p-2 outer-tabsDiv w-100 d-flex flex-column align-items-center">
        <TabTitles title={"Ρυθμίσεις Χρήστη"} />
        <UserSettingsForm loggedInUser={props.loggedInUser}/>
  </div>)
}
export default UserSettingsTab;