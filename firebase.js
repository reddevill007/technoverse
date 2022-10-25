// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa_376Vmh7JbWyCf2zy0VHmMKvBuhjJr8",
  authDomain: "technoverse.firebaseapp.com",
  projectId: "technoverse",
  storageBucket: "technoverse.appspot.com",
  messagingSenderId: "677802898534",
  appId: "1:677802898534:web:19a83d17773f734ea729a7",
  measurementId: "G-PXMCST41B6",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
