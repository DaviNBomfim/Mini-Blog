
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmfkPYuAlZvLG-BtCTi7pvSGUVktryWEU",
  authDomain: "miniblog-a68e7.firebaseapp.com",
  projectId: "miniblog-a68e7",
  storageBucket: "miniblog-a68e7.firebasestorage.app",
  messagingSenderId: "124207678030",
  appId: "1:124207678030:web:9425b2a22f4ccbaafeb91f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, app };