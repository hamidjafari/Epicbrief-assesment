import * as functions from "firebase-functions";
import { testHandler } from "./http/epicbrief";
import { syncWithHubspotHandler } from "./http/hubspot";
import * as admin from "firebase-admin";

admin.initializeApp();

admin.firestore().settings({
	ignoreUndefinedProperties: true,
});

export const test = functions.https.onRequest(testHandler);
export const syncWithHubspot = functions.https.onRequest(
	syncWithHubspotHandler
);
