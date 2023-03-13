import { BaseModel } from "./Base";

export interface MeetingModel extends BaseModel {
	collectionName: "meetings";
	schema: {
		company: {
			hubspotId: string;
			name: string;
		};
		createdAt: string;
		hubspotId: string;
		nextSteps: string;
		title: string;
		updatedAt: string;
	};
}
