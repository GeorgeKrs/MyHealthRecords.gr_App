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
import UserSettingsTab from "./tabs/UserSettingsTab";
// font icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICONS } from "../icons/icons";
// firebase
import { auth, signOut } from "../utils/firebase";
// modals
import { Modal } from "react-bootstrap";
import { faCaretSquareDown } from "@fortawesome/free-solid-svg-icons";

const MainScreen = (props) => {
  const [tab, setTab] = useState("1");
  const [activeTab, setActiveTab] = useState("1");

  // modals
  const [showSignOut, setShowSignOut] = useState(false);
  const handleCloseSignOut = () => setShowSignOut(false);
  const handleOpenSignOut = () => setShowSignOut(true);

  const [dropMenuState, setDropMenuState] = useState(false);
  const handleCloseMenu = () => setDropMenuState(false);
  const handleOpenMenu = () => setDropMenuState(true);

  const tabSelectorHandler = (tabId) => {
    if (tabId === "8") {
      handleOpenSignOut();
    } else {
      setTab(tabId);
      setActiveTab(tabId);
    }
  };

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="d-flex outer-maindiv" id="outerMainDiv">
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

      {/* mobile version */}

      <div className="p-3 inner-maindiv d-sm-block d-md-none d-flex justify-content-center">
        <FontAwesomeIcon
          style={{ fontSize: "25px", color: "var(--bs-light)" }}
          icon={faCaretSquareDown}
          onClick={handleOpenMenu}
        />
        <div className="px-3" style={{ color: "var(--bs-light)" }}>
          Μενού Πλοήγησης
        </div>
      </div>

      {(tab === "1" && <VitalsTab loggedInUser={props.loggedInUser} />) ||
        (tab === "2" && (
          <VitalsHistoryTab loggedInUser={props.loggedInUser} />
        )) ||
        (tab === "3" && <PDFTab loggedInUser={props.loggedInUser} />) ||
        (tab === "4" && <PDFHistoryTab loggedInUser={props.loggedInUser} />) ||
        (tab === "5" && <AllergiesTab loggedInUser={props.loggedInUser} />) ||
        (tab === "7" && <UserSettingsTab loggedInUser={props.loggedInUser} />)}

      {/* menu modal */}
      <Modal show={dropMenuState} onHide={handleCloseMenu}>
        <Modal.Header>
          <Modal.Title>Πλοήγηση</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="d-flex flex-wrap p-3 text-center mb-3"
            style={{ backgroundColor: "var(--bs-primary" }}
          >
            {ICONS.map((menu_icon) => (
              <div key={menu_icon.id} className="p-3 mt-2 ">
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
              </div>
            ))}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleCloseMenu}
          >
            Επιστροφή
          </button>
        </Modal.Footer>
      </Modal>
      {/* end of menu modal */}

      {/* signout modal */}
      <Modal show={showSignOut} onHide={handleCloseSignOut}>
        <Modal.Header>
          <Modal.Title>Αποσύνδεση</Modal.Title>
        </Modal.Header>
        <Modal.Body>Είστε σίγουροι ότι θέλετε να αποσυνδεθείτε;</Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-danger"
            onClick={signOutHandler}
          >
            Αποσύνδεση
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCloseSignOut}
          >
            Άκυρο
          </button>
        </Modal.Footer>
      </Modal>
      {/*signout modal */}
    </div>
  );
};

export default MainScreen;
