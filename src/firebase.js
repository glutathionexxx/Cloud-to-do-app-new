// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLlh8mGohcNFqqhR8QEB7tQZ_pl8MP9NU",
  authDomain: "cloud-to-do-app-83380.firebaseapp.com",
  projectId: "cloud-to-do-app-83380",
  storageBucket: "cloud-to-do-app-83380.firebasestorage.app",
  messagingSenderId: "761477364081",
  appId: "1:761477364081:web:a05ae95d06da379dd6ded0",
  measurementId: "G-W131D2F5N1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;
