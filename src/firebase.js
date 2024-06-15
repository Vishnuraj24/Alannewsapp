import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Replace with your Firebase project configuration details
  apiKey: "AIzaSyBNl2k1F1ePwzyqyWSTfMKJdwMfE4jYtrM",
  authDomain: "newsreaderapp-b9b58.firebaseapp.com",
  projectId: "newsreaderapp-b9b58",
  storageBucket: "newsreaderapp-b9b58.appspot.com",
  messagingSenderId: "84565542298",
  appId: "1:84565542298:web:e49e7e658f2b63645ca623",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
