import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAY29tthnQfvJ31J492E3A9BfU92BXeE5U",
  authDomain: "hero-gianmarco-cossio-app.firebaseapp.com",
  projectId: "hero-gianmarco-cossio-app",
  storageBucket: "hero-gianmarco-cossio-app.appspot.com",
  messagingSenderId: "247904280941",
  appId: "1:247904280941:web:e798b7b58239d9e845fa64",
  measurementId: "G-3T9BXHZQNF",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
