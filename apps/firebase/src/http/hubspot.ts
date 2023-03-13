import { Client } from "@hubspot/api-client";
import { HttpsHandlerType } from "../types/handler";

// TODO should be like this, but this is a paid feature -> const hubspotApiKey = defineSecret("HUBSPOT_API_KEY");
const hubspotApiKey = "pat-eu1-c40f0d45-06c6-42c4-a30a-3d2db40ceaf8";

export const syncWithHubspotHandler: HttpsHandlerType = (req, res) => {
	const client = new Client();
	client.setAccessToken(hubspotApiKey);
	client.crm.objects.meetings.basicApi
		.getPage(Infinity, undefined, undefined, undefined, ["companies"])
		.then((result) => res.send(result.results));
};
