/** @format */
// Firebase v9+ uses a different import style
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD8NpuEss9sZK-aZzehcrIjiqBaTyPHwC4",
  authDomain: "student-hub-cddbb.firebaseapp.com",
  databaseURL:
    "https://student-hub-cddbb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "student-hub-cddbb",
  storageBucket: "student-hub-cddbb.appspot.com",
  messagingSenderId: "828903681472",
  appId: "1:828903681472:web:8e4a32ffaf6d4b597d2c25",
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const db = getFirestore(firebaseApp);
const database = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);
export { storage, database, db, auth, provider };
