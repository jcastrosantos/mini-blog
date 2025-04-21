import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNPAbE2edOe4JN34mbZ-ZoHNHKBV-KXsk",
  authDomain: "miniblog-922f6.firebaseapp.com",
  projectId: "miniblog-922f6",
  storageBucket: "miniblog-922f6.firebasestorage.app",
  messagingSenderId: "393204171733",
  appId: "1:393204171733:web:8fca7d46173d650e26335c",
  measurementId: "G-8RSGBTP9ZL",
};

// Initialize the Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
export default app;

