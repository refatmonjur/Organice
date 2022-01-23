// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";
import { getMessaging } from "firebase/messaging";
// import firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-librarie

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const messaging = getMessaging();

// const { REACT_APP_VAPID_KEY } = process.env;
// const publicKey = REACT_APP_VAPID_KEY;

// export const getTokens = async (setTokenFound) => {
//   let currentToken = "";

//   try {
//     currentToken = await messaging.getToken({ vapidKey: publicKey });
//     if (currentToken) {
//       setTokenFound(true);
//     } else {
//       setTokenFound(false);
//     }
//   } catch (error) {
//     console.log("An error occurred while retrieving token. ", error);
//   }

//   return currentToken;
// };

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     messaging.onMessage((payload) => {
//       resolve(payload);
//     });
//   });
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
