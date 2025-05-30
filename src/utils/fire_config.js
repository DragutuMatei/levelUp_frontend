import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDxvFfFyG0gMcH7zTjoTnJa8_jqUh5Q_mw",
  authDomain: "levelup-aa698.firebaseapp.com",
  projectId: "levelup-aa698",
  storageBucket: "levelup-aa698.firebasestorage.app",
  messagingSenderId: "344814257379",
  appId: "1:344814257379:web:c4dbf66163fe22043ff1d6",
  measurementId: "G-NN9YEMHVLH",
  databaseURL: "https://levelup-aa698-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
 const db = getDatabase(app);
export { db, app, auth };
