// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4fLtAtUUgxsikkYxqHnFcbm8aF4S8seg",
  authDomain: "profilein-easier-aa0eb.firebaseapp.com",
  projectId: "profilein-easier-aa0eb",
  storageBucket: "profilein-easier-aa0eb.appspot.com", // fixed extension
  messagingSenderId: "296290896833",
  appId: "1:296290896833:web:ff18f306084dfc19e23d40"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
