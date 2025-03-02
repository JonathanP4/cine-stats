import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: "cine-stats.firebaseapp.com",
	databaseURL: "https://cine-stats-default-rtdb.firebaseio.com",
	projectId: "cine-stats",
	storageBucket: "cine-stats.appspot.com",
	messagingSenderId: "120652960433",
	appId: "1:120652960433:web:a802cc048f205d3550c890",
};

export const app = initializeApp(firebaseConfig);
