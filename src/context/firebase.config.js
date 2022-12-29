// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnP9gXpRYtFXDzMmeztnsWpgfl8hTEqp0",
  authDomain: "yourbook-bd.firebaseapp.com",
  projectId: "yourbook-bd",
  storageBucket: "yourbook-bd.appspot.com",
  messagingSenderId: "877147911208",
  appId: "1:877147911208:web:b5a68e8f79c14d04b5311d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
