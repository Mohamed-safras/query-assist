import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIRE_BASE_API_KEY,
  authDomain: "query-assist.firebaseapp.com",
  projectId: "query-assist",
  storageBucket: "query-assist.appspot.com",
  messagingSenderId: "879332522350",
  appId: "1:879332522350:web:2dbd45de265dcd978de97f",
  measurementId: "G-J97NZE3764",
};

const app = getApps.length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
