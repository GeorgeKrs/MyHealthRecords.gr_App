import {
  faHeartbeat,
  faFileMedicalAlt,
  faFileMedical,
  faBookMedical,
  faAllergies,
  faUserCog,
  faChartBar,
  faPaw,
  faCalendarAlt,
  faSignOutAlt,
  faSave,
  faUserEdit,
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
    icon: faChartBar,
    description: "Στατιστικά Μετρήσεων Ζωτικών Λειτουργιών",
  },
  {
    id: "7",
    icon: faUserCog,
    description: "Ρυθμίσεις Χρήστη",
  },
  {
    id: "8",
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

export { ICONS, ICONS_ALLERGIES_TAB };
