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
          {ICONS.map((icon, index, arr) => {
            if (arr.length - 1 === index) {
              return (
                <div className="mt-auto p-3 mt-2">
                  <FontAwesomeIcon
                    className="icons-custom"
                    icon={icon}
                    id={index.toString()}
                    size="lg"
                  />
                </div>
              );
            } else {
              return (
                <div className="p-3 mt-2">
                  <FontAwesomeIcon
                    className="icons-custom"
                    icon={icon}
                    id={index.toString()}
                    size="lg"
                  />
                </div>
              );
            }
          })}

          {/* {Object.keys(ICONS).map(function (faHeartbeat, id) {
            console.log(id);
            console.log(faHeartbeat);
            <div className="p-3 mt-2">
              <FontAwesomeIcon
                className="icons-custom"
                icon={faHeartbeat}
                id={id}
                size="lg"
              />
            </div>;
          })} */}
        </div>
      </div>
      <PDFTab />
      {/* <VitalsTab /> */}
    </div>
  );
};

export default MainScreen;
