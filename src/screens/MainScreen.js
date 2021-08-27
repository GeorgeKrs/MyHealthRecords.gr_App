import "./screens.css";
import Navbar from "../navbars/Navbar";
import VitalsTab from "./NavbarTabs/VitalsTab";
import PDFTab from "./NavbarTabs/PDFTab";

const MainScreen = () => {
  return (
    <div>
      <div className="d-flex outer-MainDiv">
        <div className="inner-MainDiv">
          <Navbar
            FontIconClass={[
              "VITALS",
              "VITALS_R",
              "PDF",
              "PDF_R",
              "ALLERGIES",
              "METRICS",
              "CAL",
              "SETTINGS",
              "EXIT",
            ]}
          ></Navbar>
        </div>
        <PDFTab />
        {/* <VitalsTab /> */}
      </div>
    </div>
  );
};

export default MainScreen;
