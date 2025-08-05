// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore, clearIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDSoH3VobmKWJJqL6mX7wQ0S28L0XhuTGc",
  authDomain: "rare-citadel-466617-h8.firebaseapp.com",
  projectId: "rare-citadel-466617-h8",
  storageBucket: "rare-citadel-466617-h8.firebasestorage.app",
  messagingSenderId: "480738171799",
  appId: "1:480738171799:web:dcd240e837b92e98ce82d2",
  measurementId: "G-CR3X24S4HV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

clearIndexedDbPersistence(db)
  .then(() => console.log("Cleared local Firestore cache"))
  .catch(err => console.warn("Could not clear cache:", err));

export { auth, db, storage };









