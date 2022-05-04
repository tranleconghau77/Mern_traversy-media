// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {
  addDoc,
  getFirestore,
  collection,
  getDocs,
} = require("firebase/firestore/lite");
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXcnNZEDdi-dcNpusS36tH9afWhIOvcg0",
  authDomain: "book-c6581.firebaseapp.com",
  projectId: "book-c6581",
  storageBucket: "book-c6581.appspot.com",
  messagingSenderId: "795712330613",
  appId: "1:795712330613:web:bb5fa4400805ae372b113c",
  measurementId: "G-VF1Q91X895",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
module.exports = app;
