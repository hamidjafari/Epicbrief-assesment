import { MeetingModel } from "../models/MeetingModel";
import { BaseCollection } from "./BaseCollection";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { HubspotChangesModel } from "../models/HubspotChangesModel";

const firebaseConfig = {
	apiKey: "AIzaSyCyZjV8Jv8nmUigmEb38kYxBjqpskrgQ7c",
	authDomain: "epicbrief-cf767.firebaseapp.com",
	projectId: "epicbrief-cf767",
	storageBucket: "epicbrief-cf767.appspot.com",
	messagingSenderId: "864088793982",
	appId: "1:864088793982:web:a8f79761e2505c8d1fc92f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const firestoreModels = {
	meetings: new BaseCollection<MeetingModel>(db, "meetings"),
	hubspotChanges: new BaseCollection<HubspotChangesModel>(db, "hubspotChanges"),
};

export { db, firestoreModels };
