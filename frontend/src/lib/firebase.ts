import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyAg1VCv1yU0Bv00yI-dYyIUy7J52eeeeyI",
    authDomain: "cine-stats.firebaseapp.com",
    projectId: "cine-stats",
    storageBucket: "cine-stats.appspot.com",
    messagingSenderId: "120652960433",
    appId: "1:120652960433:web:a802cc048f205d3550c890",
    databaseURL: "https://cine-stats-default-rtdb.firebaseio.com/",
};

export const app = initializeApp(firebaseConfig);
