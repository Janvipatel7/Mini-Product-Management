
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEu7_dqKs2xI2szgAsJFf8PhmvyXxDB_4",
  authDomain: "react-fire-c8160.firebaseapp.com",
  projectId: "react-fire-c8160",
  storageBucket: "react-fire-c8160.firebasestorage.app",
  messagingSenderId: "900386503393",
  appId: "1:900386503393:web:c14ae821340ca9f348d5a0"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
