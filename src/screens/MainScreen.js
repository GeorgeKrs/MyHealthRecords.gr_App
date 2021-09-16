import { useState } from "react";
// importing tooltip
import Tooltip from "../general/Tooltip";
// importing screens & tabs
import "./screens.css";
import VitalsTab from "../screens/tabs/VitalsTab";
import VitalsHistoryTab from "./tabs/VitalsHistoryTab";
import PDFTab from "../screens/tabs/PDFTab";
import PDFHistoryTab from "./tabs/PDFHistoryTab";
import AllergiesTab from "./tabs/AllergiesTab";
// font icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICONS } from "../icons/icons";
// firebase
import { auth, signOut } from "../utils/firebase";

const MainScreen = (props) => {
  const [tab, setTab] = useState("1");
  const [activeTab, setActiveTab] = useState("1");

  const tabSelectorHandler = (tabId) => {
    setTab(tabId);
    setActiveTab(tabId);

    if (tabId === "8") {
      alert("Sign out ?");
      signOut(auth)
        .then(() => {
          window.location.reload(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="d-flex outer-maindiv">
      <div className="inner-maindiv d-none d-sm-block">
        <div className="p-3 d-flex flex-shrink-1 flex-column text-center mb-3 h-100">
          {/* <h6>{props.loggedInUser}</h6> */}
          <h6>App Logo</h6>
          {ICONS.map((menu_icon, index, arr) => (
            <div
              key={menu_icon.id}
              className={
                arr.length - 2 === index ? "mt-auto p-3 mt-2 " : "p-3 mt-2"
              }
            >
              <Tooltip content={menu_icon.description}>
                <FontAwesomeIcon
                  id={menu_icon.id}
                  className={
                    activeTab === menu_icon.id
                      ? "icons-custom-active"
                      : "icons-custom"
                  }
                  icon={menu_icon.icon}
                  size="lg"
                  onClick={tabSelectorHandler.bind(this, menu_icon.id)}
                />
              </Tooltip>
            </div>
          ))}
        </div>
      </div>

      {(tab === "1" && <VitalsTab loggedInUser={props.loggedInUser} />) ||
        (tab === "2" && <VitalsHistoryTab />) ||
        (tab === "3" && <PDFTab />) ||
        (tab === "4" && <PDFHistoryTab />) ||
        (tab === "5" && <AllergiesTab />)}
    </div>
  );
};

export default MainScreen;
