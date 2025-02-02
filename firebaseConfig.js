// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8cfcsIVHP5FSa174kc9po4hX_XTUY6qw",
  authDomain: "my-library-f087f.firebaseapp.com",
  projectId: "my-library-f087f",
  storageBucket: "my-library-f087f.firebasestorage.app",
  messagingSenderId: "153971514694",
  appId: "1:153971514694:web:3b9175255fbbb073695947",
  measurementId: "G-ZQPPBMRB7M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
