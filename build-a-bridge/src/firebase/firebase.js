import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkVT1si1I7t7j6ih5Gu1_aC2GO5RKv0iA",
  authDomain: "build-a-bridge-e165e.firebaseapp.com",
  projectId: "build-a-bridge-e165e",
  storageBucket: "build-a-bridge-e165e.appspot.com",
  messagingSenderId: "355030794692",
  appId: "1:355030794692:web:ffa3e9c9aef93b594e6491",
  measurementId: "G-4NG389EQ9Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };