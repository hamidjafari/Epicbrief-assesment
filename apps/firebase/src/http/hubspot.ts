import * as admin from "firebase-admin";
import { Client } from "@hubspot/api-client";
import { HttpsHandlerType } from "../types/handler";

// TODO should be like this, but this is a paid feature -> const hubspotApiKey = defineSecret("HUBSPOT_API_KEY");
const hubspotApiKey = "pat-eu1-c40f0d45-06c6-42c4-a30a-3d2db40ceaf8";

export const syncCompaniesWithHubspotHandler: HttpsHandlerType = async (
	request,
	response
) => {
	const client = new Client();
	client.setAccessToken(hubspotApiKey);

	const hubspotCompanies: {
		[key: string]: { name: string; hubspotId: string };
	} = await client.crm.companies.basicApi
		.getPage(Infinity, undefined, ["name"])
		.then((result) =>
			result.results.reduce((acc, company) => {
				acc[company.id] = {
					name: company.properties["name"],
					hubspotId: company.id,
				};
				return acc;
			}, {})
		);

	const meetingCollection = admin.firestore().collection("meetings");

	meetingCollection.get().then((res) =>
		res.docs.forEach((doc) => {
			meetingCollection
				.doc(doc.id)
				.update({ company: hubspotCompanies[doc.data().company.id] });
		})
	);

	response.send();
};
