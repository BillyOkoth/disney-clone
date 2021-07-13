import firebase from "firebase";
const  firebaseConfig = {
    apiKey: "AIzaSyCXLPL7ojXpvUdwuZVfEDFkh6TFyJ-BYuY",
    authDomain: "disney-pro-18c93.firebaseapp.com",
    projectId: "disney-pro-18c93",
    storageBucket: "disney-pro-18c93.appspot.com",
    messagingSenderId: "135339997307",
    appId: "1:135339997307:web:8b98b92789df79ad084ade",
    measurementId: "G-BN5TZR1L5G"
  };
  // Initialize Firebase
const firebaseApp =   firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
const auth = firebase.auth();

export {auth,provider,storage};
export default db;
