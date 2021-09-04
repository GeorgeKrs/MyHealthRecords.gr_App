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
  {
    id: "Vitals_icon",
    icon: faFileMedicalAlt,
    description: "Καταχώρηση Μέτρησης Ζωτικών Λειτουργιών",
  },
  {
    id: "VitalsR_icon",
    icon: faHeartbeat,
    description: "Ιστορικό Ζωτικών Λειτουργιών",
  },
  {
    id: "PDF_icon",
    icon: faFileMedical,
    description: "Καταχώρηση Εξέτασης",
  },
  {
    id: "PDFR_icon",
    icon: faBookMedical,
    description: "Ιστορικό Καταχωρημένων Εξετάσεων",
  },
  {
    id: "All_icon",
    icon: faAllergies,
    description: "Αλλεργίες",
  },
  {
    id: "Metrics_icon",
    icon: faChartBar,
    description: "Στατιστικά Μετρήσεων Ζωτικών Λειτουργιών",
  },
  {
    id: "Settings_icon",
    icon: faUserCog,
    description: "Ρυθμίσεις Χρήστη",
  },
  {
    id: "SignOut_icon",
    icon: faSignOutAlt,
    description: "Έξοδος",
  },
];

export default ICONS;
