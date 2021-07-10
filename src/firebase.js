import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDiVWY7tocwjHkMG3lShBtKGC92hklQX3A",
    authDomain: "book-tracker-63315.firebaseapp.com",
    projectId: "book-tracker-63315",
    storageBucket: "book-tracker-63315.appspot.com",
    messagingSenderId: "564253274860",
    appId: "1:564253274860:web:7d6b95d4494ebb084d2bc9",
    measurementId: "G-DDCW3GPZ31"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;