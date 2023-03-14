import * as functions from "firebase-functions";
import { getCompaniesHandler } from "./http/epicbrief";
import { syncCompaniesWithHubspotHandler } from "./http/hubspot";
import * as admin from "firebase-admin";

admin.initializeApp();

admin.firestore().settings({
	ignoreUndefinedProperties: true,
});

export const getCompanies = functions.https.onRequest(getCompaniesHandler);
export const syncCompaniesWithHubspot = functions.https.onRequest(
	syncCompaniesWithHubspotHandler
);
