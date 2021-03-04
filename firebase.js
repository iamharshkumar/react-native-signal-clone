import * as firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

let app;

if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore()
const auth = firebase.auth();

export {db, auth};