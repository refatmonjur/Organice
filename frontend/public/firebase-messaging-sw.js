// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// // eslint-disable-next-line no-undef
// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// // Initialize the Firebase app in the service worker by passing the generated config
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
//   //   apiKey: "FROM FIREBASE CONSOLE",
//   //   authDomain: "FROM FIREBASE CONSOLE",
//   //   databaseURL: "FROM FIREBASE CONSOLE",
//   //   projectId: "FROM FIREBASE CONSOLE",
//   //   storageBucket: "FROM FIREBASE CONSOLE",
//   //   messagingSenderId: "FROM FIREBASE CONSOLE",
//   //   appId: "FROM FIREBASE CONSOLE",
//   //   measurementId: "FROM FIREBASE CONSOLE",
// };

// // eslint-disable-next-line no-undef
// firebase.initializeApp(firebaseConfig);

// // Retrieve firebase messaging
// // eslint-disable-next-line no-undef
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//   console.log("Received background message ", payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     // icon: "/logo192.png",
//   };

//   // eslint-disable-next-line no-restricted-globals
//   return self.registration.showNotification(
//     notificationTitle,
//     notificationOptions
//   );
// });

// // importScripts("https://www.gstatic.com/firebasejs/3.5.0/firebase-app.js");
// // importScripts("https://www.gstatic.com/firebasejs/3.5.0/firebase-messaging.js");

// // if ("serviceWorker" in navigator) {
// //   navigator.serviceWorker
// //     .register("../firebase-messaging-sw.js")
// //     .then(function (registration) {
// //       console.log("Registration successful, scope is:", registration.scope);
// //     })
// //     .catch(function (err) {
// //       console.log("Service worker registration failed, error:", err);
// //     });
// // }

// // initializeApp({
// //   messagingSenderId: "143001334645",
// // });

// // const initMessaging = app.messaging();
