import "./screens.css";
import Navbar from "../navbars/Navbar";
import VitalsScreen from "./NavbarScreens/VitalsScreen";

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

        <VitalsScreen />
      </div>
    </div>
  );
};

export default MainScreen;
