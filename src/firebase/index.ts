// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqz1mzvDfzI67tUzS3tVDLQttHcQYBMLw",
  authDomain: "easy-braai.firebaseapp.com",
  projectId: "easy-braai",
  storageBucket: "easy-braai.firebasestorage.app",
  messagingSenderId: "1022582636648",
  appId: "1:1022582636648:web:a19e6ff29503d0163f7bdd",
  measurementId: "G-WYG8BS6J2R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const functions = getFunctions(app);

if (window.location.hostname === "localhost") {
  console.log("🔥 Using Firebase Emulators");
  // Connect to Firestore Emulator
  connectFirestoreEmulator(db, "localhost", 8080);
  // Connect to Auth Emulator
  connectAuthEmulator(auth, "http://localhost:9099");
  // Connect to Functions Emulator
  connectFunctionsEmulator(functions, "localhost", 5001);
}

const firebase = {
  db,
  auth,
  functions,
  analytics,
};

export default firebase;
