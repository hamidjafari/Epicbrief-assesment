import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { HttpsHandlerType } from "../types/handler";

export const testHandler: HttpsHandlerType = (request, response) => {
	functions.logger.info("Hello logs!", { structuredData: true });
	admin
		.firestore()
		.collection("meetings")
		.get()
		.then((res) => response.send(res.docs.map((doc) => doc.data())));
};
