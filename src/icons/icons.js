import {
  faHeartbeat,
  faFileMedicalAlt,
  faFileMedical,
  faBookMedical,
  faAllergies,
  faChartBar,
  faPaw,
  faCalendarAlt,
  faSignOutAlt,
  faSave,
  faUserEdit,
  faExclamationCircle,
  faCheckSquare,
  faCog,
  faHeart,
  faWeight,
  faLungs,
  faThermometer,
  faSyringe,
} from "@fortawesome/free-solid-svg-icons";

const ICONS = [
  {
    id: "1",
    icon: faFileMedicalAlt,
    description: "Καταχώρηση Μέτρησης Ζωτικών Λειτουργιών",
  },
  {
    id: "2",
    icon: faHeartbeat,
    description: "Ιστορικό Ζωτικών Λειτουργιών",
  },
  {
    id: "3",
    icon: faFileMedical,
    description: "Καταχώρηση Εξέτασης",
  },
  {
    id: "4",
    icon: faBookMedical,
    description: "Ιστορικό Καταχωρημένων Εξετάσεων",
  },
  {
    id: "5",
    icon: faAllergies,
    description: "Αλλεργίες",
  },
  {
    id: "6",
    icon: faSyringe,
    description: "Καταχώρηση Μέτρησης Σακχάρου",
  },
  {
    id: "7",
    icon: faChartBar,
    description: "Στατιστικά Όλων των Μετρήσεων",
  },
  {
    id: "8",
    icon: faCog,
    description: "Ρυθμίσεις Χρήστη",
  },
  {
    id: "9",
    icon: faSignOutAlt,
    description: "Έξοδος",
  },
];

const ICONS_ALLERGIES_TAB = [
  {
    id: "1",
    icon: faSave,
    description: "Αποθήκευση",
  },
  {
    id: "2",
    icon: faUserEdit,
    description: "Επεξεργασία",
  },
];

const ICONS_errHANDLING = [
  {
    id: "1",
    icon: faCheckSquare,
    description: "Επιτυχία",
  },
  {
    id: "2",
    icon: faExclamationCircle,
    description: "Σφάλμα",
  },
];

const ICONS_METRICS_TAB = [
  {
    id: "1",
    icon: faHeart,
  },
  {
    id: "2",
    icon: faHeartbeat,
  },
  {
    id: "3",
    icon: faThermometer,
  },
  {
    id: "4",
    icon: faLungs,
  },
  {
    id: "5",
    icon: faWeight,
  },
];

export { ICONS, ICONS_ALLERGIES_TAB, ICONS_errHANDLING, ICONS_METRICS_TAB };
