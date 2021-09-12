// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDCa3Ji11Oyxt3XrSo3iwI1J0oaowp7_RI",
  authDomain: "myhealthrecords-1b568.firebaseapp.com",
  projectId: "myhealthrecords-1b568",
  storageBucket: "myhealthrecords-1b568.appspot.com",
  messagingSenderId: "57813345085",
  appId: "1:57813345085:web:2d2bfd7f09bbcdad085b54",
  measurementId: "G-1S0L4Q9Y5G",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

// import { getAnalytics } from "firebase/analytics";
// const analytics = getAnalytics(app);

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
};
