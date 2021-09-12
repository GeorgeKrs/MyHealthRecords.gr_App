import { useState } from "react";
// screens
import ContactTab from "./IndexScreen_tabs/ContactTab";
import InfoTab from "./IndexScreen_tabs/InfoTab";
import LoginForm from "../Forms/LoginForm";
import SignUpForm from "../Forms/SignUpForm";

const IndexScreen = () => {
  const [tab, setTab] = useState("0");
  const [activeTab, setActiveTab] = useState("0");

  const tabSelectorHandler = (buttonId) => {
    setTab(buttonId);
    setActiveTab(buttonId);
  };

  return (
    <div className="outer-indexdiv">
      <div className="container">
        <div className="d-flex bd-highlight mb-3">
          <div className="me-auto p-3 bd-highlight">APP LOGO</div>
          <div className="p-3 bd-highlight">
            <button
              id="1"
              className={
                activeTab === "1" ? "btn btn-danger" : "btn btn-outline-danger"
              }
              onClick={tabSelectorHandler.bind(this, "1")}
            >
              Επικοινωνία
            </button>
          </div>
          <div className="p-3 bd-highlight">
            <button
              id="2"
              className={
                activeTab === "2"
                  ? "btn btn-success"
                  : "btn btn-outline-success"
              }
              onClick={tabSelectorHandler.bind(this, "2")}
            >
              Σχετικά με εμάς
            </button>
          </div>
          <div className="p-3 bd-highlight">
            <button
              id="3"
              className={
                activeTab === "3"
                  ? "btn btn-primary"
                  : "btn btn-outline-primary"
              }
              onClick={tabSelectorHandler.bind(this, "3")}
            >
              Είσοδος
            </button>
          </div>
          <div className="p-3 bd-highlight">
            <button
              id="4"
              className={
                activeTab === "4" ? "btn btn-dark" : "btn btn-outline-dark"
              }
              onClick={tabSelectorHandler.bind(this, "4")}
            >
              Εγγραφή
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5 pt-5 d-flex flex-column align-items-center">
        {(tab === "1" && <ContactTab />) ||
          (tab === "2" && <InfoTab />) ||
          (tab === "3" && <LoginForm />) ||
          (tab === "4" && <SignUpForm />)}
      </div>
    </div>
  );
};

export default IndexScreen;
