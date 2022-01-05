// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-librarie

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDO_Fmsz5qKHp6gIPTaIOUxaInWbnUmo-k",
  authDomain: "organice-8c46a.firebaseapp.com",
  projectId: "organice-8c46a",
  storageBucket: "organice-8c46a.appspot.com",
  messagingSenderId: "726981399495",
  appId: "1:726981399495:web:a54f1f72e35b8b77f17fe2",
  measurementId: "G-WZHJHWQ4LH"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth();

export default app;