// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaFlrutNCOy5-il6v4eD2wv5Yvb2AWgXo",
  authDomain: "konect4-4fa8c.firebaseapp.com",
  projectId: "konect4-4fa8c",
  storageBucket: "konect4-4fa8c.firebasestorage.app",
  messagingSenderId: "150677868017",
  appId: "1:150677868017:web:70ed6460a619c785504850"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;