// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDddGkl85acW1FOMz5NsphWBd6CkgtSLt0",
  authDomain: "invoice-generator-9c7c8.firebaseapp.com",
  projectId: "invoice-generator-9c7c8",
  storageBucket: "invoice-generator-9c7c8.appspot.com",
  messagingSenderId: "150934956186",
  appId: "1:150934956186:web:3a63898cc3bf42056d9723",
  measurementId: "G-V5MP2YK05J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);