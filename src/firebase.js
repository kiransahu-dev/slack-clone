import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDJ77kqRa2Rf8YM-eFNHJpPkIiTtzkYIEU",
    authDomain: "slack-clone-98.firebaseapp.com",
    projectId: "slack-clone-98",
    storageBucket: "slack-clone-98.appspot.com",
    messagingSenderId: "355138080302",
    appId: "1:355138080302:web:edd0c554b874051da7d9bf"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };