
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYD0HknRFMz_fk4Z7hlkLYH41WbNRHn5E",
  authDomain: "sansemillero-d649f.firebaseapp.com",
  projectId: "sansemillero-d649f",
  storageBucket: "sansemillero-d649f.appspot.com",
  messagingSenderId: "935588544435",
  appId: "1:935588544435:web:5ae0eb017568c627efd5c6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
