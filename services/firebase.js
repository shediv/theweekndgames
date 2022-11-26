// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXQD2SSLw3masAj6IqJjTvs-XsjyP-Df0",
  authDomain: "vct2023-c76c3.firebaseapp.com",
  projectId: "vct2023-c76c3",
  storageBucket: "vct2023-c76c3.appspot.com",
  messagingSenderId: "320321095402",
  appId: "1:320321095402:web:6bf7254d040e169e9eb993",
  measurementId: "G-KPD5YJT9S6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);