/** @format */
// Firebase v9+ uses a different import style
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDxCqfsIf1gx3qYiRIWajW9ML-4mWdZvrM",
  authDomain: "popular-social-mern-e354e.firebaseapp.com",
  projectId: "popular-social-mern-e354e",
  storageBucket: "popular-social-mern-e354e.appspot.com",
  messagingSenderId: "442469402815",
  appId: "1:442469402815:web:7f0b9fd4d4dd3b57fc9e0a",
  measurementId: "G-1CVB9MN4EE",
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider };
