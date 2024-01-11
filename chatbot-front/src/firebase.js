/** @format */
// Firebase v9+ uses a different import style
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAf4a8i-gMe5TGUDadLHgYjhfw_vYWtTQ4",
  authDomain: "chatbot-app-d8a9e.firebaseapp.com",
  projectId: "chatbot-app-d8a9e",
  storageBucket: "chatbot-app-d8a9e.appspot.com",
  messagingSenderId: "438107814682",
  appId: "1:438107814682:web:e6c022c2b4e51031130aa3",
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider };
