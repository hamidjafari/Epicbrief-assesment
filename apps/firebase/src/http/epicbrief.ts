import * as admin from "firebase-admin";
import { HttpsHandlerType } from "../types/handler";

export const getCompaniesHandler: HttpsHandlerType = async (
	request,
	response
) => {
	const companies = await admin
		.firestore()
		.collection("meetings")
		.get()
		.then((res) =>
			res.docs.reduce<{ [key: string]: { name: string; hubspotId: string } }>(
				(acc, doc) => {
					const meeting = doc.data();
					acc[meeting.company.id] = meeting.company;
					return acc;
				},
				{}
			)
		);

	response.send(Object.values(companies));
};
