// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBygRYDqU0jtoBOmEU_S-otekSr9dU1TQE",
    authDomain: "netflix-chatgpt-ui-project.firebaseapp.com",
    projectId: "netflix-chatgpt-ui-project",
    storageBucket: "netflix-chatgpt-ui-project.appspot.com",
    messagingSenderId: "601175640462",
    appId: "1:601175640462:web:57b336d8534c85e362bcdf",
    measurementId: "G-ETF0YEVVJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
