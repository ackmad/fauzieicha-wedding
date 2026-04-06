import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUYTSKm3IuK_bSl35Vw6JcYOpo5OFsHv4",
  authDomain: "wedding-fauzie-icha.firebaseapp.com",
  projectId: "wedding-fauzie-icha",
  storageBucket: "wedding-fauzie-icha.firebasestorage.app",
  messagingSenderId: "189229923564",
  appId: "1:189229923564:web:dd7c0f8e128c667ef779c9"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
