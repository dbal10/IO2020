import firebase from "firebase"
import "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig = {
    apiKey: "AIzaSyB0nRxXaJe_CDrep0D4RaGIAPSxvNUbTRg",
    authDomain: "io2020-d3400.firebaseapp.com",
    databaseURL: "https://io2020-d3400-default-rtdb.firebaseio.com",
    projectId: "io2020-d3400",
    storageBucket: "io2020-d3400.appspot.com",
    messagingSenderId: "306472964264",
    appId: "1:306472964264:web:af241e9d336524435b729d",
    measurementId: "G-QKEZ7Y1PM4"
};


let fire = firebase.initializeApp(firebaseConfig);
export default fire;
