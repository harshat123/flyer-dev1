// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9bmv7FBjWJ9MLgHCAXkLUiAStb89C2as",
  authDomain: "desifyar.firebaseapp.com",
  projectId: "desifyar",
  storageBucket: "desifyar.firebasestorage.app",
  messagingSenderId: "1006637516972",
  appId: "1:1006637516972:web:7a868d209cb6b868f0f709",
  measurementId: "G-BLJPK2WJB6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
