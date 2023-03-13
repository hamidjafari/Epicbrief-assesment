export type allCollectionNames = "meetings" | "hubspotChanges";

export interface BaseModel {
	collectionName: allCollectionNames;
	schema: { [key: string]: any };
}
