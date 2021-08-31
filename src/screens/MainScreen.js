import "./screens.css";
import VitalsTab from "../screens/tabs/VitalsTab";
import PDFTab from "../screens/tabs/PDFTab";
// font icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ICONS from "../icons/icons";

const MainScreen = () => {
  return (
    <div className="d-flex outer-maindiv">
      <div className="inner-maindiv">
        <div className="p-3 d-flex flex-shrink-1 flex-column text-center mb-3 h-100">
          {ICONS.map((menu_icon, index, arr) => (
            <div
              key={menu_icon.id}
              className={
                arr.length - 1 === index ? "mt-auto p-3 mt-2" : "p-3 mt-2"
              }
            >
              <FontAwesomeIcon
                className="icons-custom"
                icon={menu_icon.icon}
                size="lg"
              />
            </div>
          ))}
        </div>
      </div>
      <PDFTab />
      {/* <VitalsTab /> */}
    </div>
  );
};

export default MainScreen;
