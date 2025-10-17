// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_LxNR8Tx7PP8Vgt7EOgjGK2KuoxDnVz4",
  authDomain: "clone-8bc34.firebaseapp.com",
  projectId: "clone-8bc34",
  storageBucket: "clone-8bc34.firebasestorage.app",
  messagingSenderId: "901933292930",
  appId: "1:901933292930:web:8cc1864c1021d2b705839b",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
