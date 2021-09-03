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
  faPaw,
} from "@fortawesome/free-solid-svg-icons";

const ICONS = [
  { id: "Vitals_icon", icon: faFileMedicalAlt },
  { id: "VitalsR_icon", icon: faHeartbeat },
  { id: "PDF_icon", icon: faFileMedical },
  { id: "PDFR_icon", icon: faBookMedical },
  { id: "All_icon", icon: faAllergies },
  { id: "Metrics_icon", icon: faChartBar },
  { id: "Settings_icon", icon: faUserCog },
  { id: "SignOut_icon", icon: faSignOutAlt },
];

export default ICONS;
