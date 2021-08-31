import {
  faHeartbeat,
  faFileMedicalAlt,
  faFileMedical,
  faBookMedical,
  faAllergies,
  faUserCog,
  faChartBar,
  faCalendarAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const ICONS = [
  { id: "Vitals_icon", icon: faHeartbeat },
  { id: "VitalsR_icon", icon: faFileMedicalAlt },
  { id: "PDF_icon", icon: faFileMedical },
  { id: "PDFR_icon", icon: faBookMedical },
  { id: "All_icon", icon: faAllergies },
  { id: "Metrics_icon", icon: faChartBar },
  { id: "Cal_icon", icon: faCalendarAlt },
  { id: "Settings_icon", icon: faUserCog },
  { id: "SignOut_icon", icon: faSignOutAlt },
];

export default ICONS;
