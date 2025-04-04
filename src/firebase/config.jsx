// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCNPAbE2edOe4JN34mbZ-ZoHNHKBV-KXsk",
  authDomain: "miniblog-922f6.firebaseapp.com",
  projectId: "miniblog-922f6",
  storageBucket: "miniblog-922f6.firebasestorage.app",
  messagingSenderId: "393204171733",
  appId: "1:393204171733:web:8fca7d46173d650e26335c",
  measurementId: "G-8RSGBTP9ZL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app,'my_collection');
export { db };
