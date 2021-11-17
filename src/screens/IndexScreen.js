import { useState } from "react";
// screens
import AppPresentation from "./IndexScreen_tabs/AppPresentation";
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
    <div className="outer-indexdiv" style={{ overflow: "hidden" }}>
      <div className="p-3 bd-highlight d-sm-block d-md-none d-lg-none">
        <span
          style={{ cursor: "pointer" }}
          onClick={tabSelectorHandler.bind(this, "0")}
        >
          APP LOGO
        </span>
      </div>
      <div className="pt-4 d-flex flex-column align-items-center d-sm-block d-md-none d-lg-none">
        {(tab === "0" && <AppPresentation />) ||
          (tab === "1" && <ContactTab />) ||
          (tab === "2" && <InfoTab />) ||
          (tab === "3" && <LoginForm />) ||
          (tab === "4" && <SignUpForm />)}
      </div>
      <div className="container">
        <div className="d-lg-flex d-md-flex bd-highlight mb-3">
          <div className="me-auto p-3 bd-highlight d-none d-sm-none d-md-block d-lg-block">
            <span
              style={{ cursor: "pointer" }}
              onClick={tabSelectorHandler.bind(this, "0")}
            >
              APP LOGO
            </span>
          </div>

          <div className="p-3 bd-highlight" id="firstButtonMargin">
            <button
              id="3"
              style={{ fontWeight: "bolder" }}
              className={
                activeTab === "3"
                  ? "btn btn-primary w-100"
                  : "btn btn-outline-primary w-100"
              }
              onClick={tabSelectorHandler.bind(this, "3")}
            >
              Είσοδος
            </button>
          </div>
          <div className="p-3 bd-highlight">
            <button
              id="4"
              style={{ fontWeight: "bolder" }}
              className={
                activeTab === "4"
                  ? "btn btn-dark w-100"
                  : "btn btn-outline-dark w-100"
              }
              onClick={tabSelectorHandler.bind(this, "4")}
            >
              Εγγραφή
            </button>
          </div>
          <div className="p-3 bd-highlight">
            <button
              id="2"
              style={{ fontWeight: "bolder" }}
              className={
                activeTab === "2"
                  ? "btn btn-success w-100"
                  : "btn btn-outline-success w-100"
              }
              onClick={tabSelectorHandler.bind(this, "2")}
            >
              Σχετικά με εμάς
            </button>
          </div>
          <div className="p-3 bd-highlight">
            <button
              id="1"
              style={{
                fontWeight: "bolder",
              }}
              className={
                activeTab === "1"
                  ? "btn btn-danger w-100"
                  : "btn btn-outline-danger w-100"
              }
              onClick={tabSelectorHandler.bind(this, "1")}
            >
              Επικοινωνία
            </button>
          </div>
        </div>
      </div>
      <div
        className="mt-5 pt-5 d-flex flex-column align-items-center"
        id="IndexTabsForLargeScreen"
      >
        {(tab === "0" && <AppPresentation />) ||
          (tab === "1" && <ContactTab />) ||
          (tab === "2" && <InfoTab />) ||
          (tab === "3" && <LoginForm />) ||
          (tab === "4" && <SignUpForm />)}
      </div>
    </div>
  );
};

export default IndexScreen;
