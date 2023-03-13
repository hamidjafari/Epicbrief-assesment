import { BaseModel } from "./Base";

export interface HubspotChangesModel extends BaseModel {
	collectionName: "hubspotChanges";
	schema: {
		name: string;
	};
}
