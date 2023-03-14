import { Timestamp } from "firebase/firestore";
import { BaseModel } from "./Base";

export interface MeetingModel extends BaseModel {
	collectionName: "meetings";
	schema: {
		company: {
			hubspotId: string;
			name: string;
		};
		createdAt: Timestamp;
		hubspotId: string;
		nextSteps: string;
		title: string;
		updatedAt: Timestamp;
	};
}
