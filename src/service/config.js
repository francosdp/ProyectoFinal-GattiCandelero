
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAYAZd-ck5WhCpBnbqCeOVuVSPdI7QpThU",
    authDomain: "proyectofinal-gatticandelero.firebaseapp.com",
    projectId: "proyectofinal-gatticandelero",
    storageBucket: "proyectofinal-gatticandelero.appspot.com",
    messagingSenderId: "692579364285",
    appId: "1:692579364285:web:992d7aa547dbd6353736d4",
    measurementId: "G-0DMNR3DJR8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)