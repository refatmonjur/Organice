// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-librarie

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAEKoAQnr9-2kLdzeLJYPB-WyWYow2E9hw",
  authDomain: "organice-8c133.firebaseapp.com",
  projectId: "organice-8c133",
  storageBucket: "organice-8c133.appspot.com",
  messagingSenderId: "143001334645",
  appId: "1:143001334645:web:ca43450de12ce4d56f193c",
  measurementId: "G-N758B3LVHL",
};
// REACT_APP_FIREBASE_API_KEY= ,
// REACT_APP_FIREBASE_AUTH_DOMAIN= "organice-8c133.firebaseapp.com",
// REACT_APP_FIREBASE_PROJECT_ID= "organice-8c133",
// REACT_APP_FIREBASE_STORAGE_BUCKET= "organice-8c133.appspot.com",
// REACT_APP_FIREBASE_MESSAGING_SENDER_ID= "143001334645",
// REACT_APP_FIREBASE_APP_ID= "1:143001334645:web:ca43450de12ce4d56f193c",
// REACT_APP_FIREBASE_MEASUREMENT_ID= "G-N758B3LVHL"

// Initialize Firebase

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
