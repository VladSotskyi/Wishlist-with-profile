// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH3nxWojwl_gEZtJSPQwI14Eu19Bl220Y",
  authDomain: "wishlist-with-profile.firebaseapp.com",
  projectId: "wishlist-with-profile",
  storageBucket: "wishlist-with-profile.appspot.com",
  messagingSenderId: "238040308220",
  appId: "1:238040308220:web:251d6b7fef2813dbb7ba79",
  measurementId: "G-NZNXFFZSX9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, "myApp");
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
