// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFs5e7ielz9s_Tv2P6fJrSMz_b34ij_4w",
  authDomain: "todolist-ed1de.firebaseapp.com",
  projectId: "todolist-ed1de",
  storageBucket: "todolist-ed1de.appspot.com",
  messagingSenderId: "23410216191",
  appId: "1:23410216191:web:048099384a35086de990ca",
  measurementId: "G-XKCM9FYB2G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
