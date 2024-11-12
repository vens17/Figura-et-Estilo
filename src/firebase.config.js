import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDslXdnNodlUzIHFlLju-INhpAFG2hU--w",
  authDomain: "figura-et-estilo.firebaseapp.com",
  projectId: "figura-et-estilo",
  storageBucket: "figura-et-estilo.appspot.com",
  messagingSenderId: "283353221588",
  appId: "1:283353221588:web:552fb68740726190c6ae41"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;