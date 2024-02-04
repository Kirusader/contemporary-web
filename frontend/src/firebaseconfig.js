/** @format */

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Firebase configuration
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

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const db = getFirestore(firebaseApp);
const database = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);
// SignIn with FaceBook
const signInWithFacebook = async (navigate, dispatch) => {
  try {
    const res = await signInWithPopup(auth, facebookProvider);
    const user = res.user;
    await checkAndAddUser(user);
    handleLoginSuccess(user, dispatch);
    navigate("/");
  } catch (error) {
    console.error("Login failed: ", error);
    if (error.code === "auth/popup-closed-by-user") {
      console.log("User closed login popup.");
    }
  }
};

// SignIn with Google
const signInWithGoogle = async (navigate, dispatch) => {
  try {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    await checkAndAddUser(user);
    handleLoginSuccess(user, dispatch);
    navigate("/"); // Using passed navigate function
  } catch (error) {
    console.error("Login failed: ", error);
    if (error.code === "auth/popup-closed-by-user") {
      console.log("User closed login popup.");
    }
  }
};

// Check and add user in Firestore
const checkAndAddUser = async (user) => {
  const q = query(collection(db, "users"), where("uid", "==", user.uid));
  const docs = await getDocs(q);
  if (docs.docs.length === 0) {
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      username: user.displayName,
      email: user.email,
      createdAt: new Date(),
    });
    console.log("New user added to Firestore.");
  }
};

// Handle login success
const handleLoginSuccess = async (user, dispatch) => {
  const token = user.accessToken;
  const uid = user.uid;
  const username = user.displayName;
  localStorage.setItem("token", token);
  localStorage.setItem("username", username);
  localStorage.setItem("uid", uid);

  dispatch({ type: "LOGIN_SUCCESS", payload: { uid, token, username } });
};

// Exports
export {
  storage,
  database,
  db,
  auth,
  provider,
  signInWithGoogle,
  signInWithFacebook,
};
