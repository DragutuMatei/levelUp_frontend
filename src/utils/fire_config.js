import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const data = await fetch(`/.netlify/functions/fire`)
  .then((res) => res.json())
  .then((res) => {
    return res;
  });

// Initialize Firebase
const app = initializeApp(data);
const auth = getAuth(app);
const db = getDatabase(app);
export { db, app, auth };
