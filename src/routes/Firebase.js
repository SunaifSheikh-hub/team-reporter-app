import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, addDoc, collection, getDocs, query,where } from "firebase/firestore";


const firebaseApp = initializeApp({
    apiKey: "AIzaSyCDfv_r0clsKGYZdt6738LJIqSRAtcj9OA",
    authDomain: "team-reporter-app-12d97.firebaseapp.com",
    projectId: "team-reporter-app-12d97",
    storageBucket: "team-reporter-app-12d97.appspot.com",
    messagingSenderId: "865845124525",
    appId: "1:865845124525:web:cf8f56cc4b349ef9ba5524"
});

const auth = getAuth();
const db = getFirestore(firebaseApp);

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,

    db,
    doc,
    setDoc,
    getDoc,
    addDoc,
    collection,
    getDocs,
    query,
    where
};
