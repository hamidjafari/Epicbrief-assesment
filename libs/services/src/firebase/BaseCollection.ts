import { UpdateData } from "firebase-admin/firestore";
import {
	collection,
	Firestore,
	CollectionReference,
	getDocs,
	doc as getDocRef,
	getDoc,
	addDoc,
	updateDoc,
	onSnapshot,
	deleteDoc,
} from "firebase/firestore";
import { BaseModel } from "../models/Base";

type WithId<T extends BaseModel["schema"]> = T & {
	id: string;
};

export class BaseCollection<T extends BaseModel> {
	private readonly collection: CollectionReference;

	constructor(db: Firestore, collectionName: T["collectionName"]) {
		this.collection = collection(db, collectionName);
	}

	async getAll(): Promise<Array<WithId<T["schema"]>>> {
		const snapshot = await getDocs<T["schema"]>(this.collection);
		return snapshot.docs.map(
			(doc) => ({ ...doc.data(), id: doc.id } as WithId<T["schema"]>)
		);
	}

	async getById(id: string): Promise<T["schema"] | undefined> {
		const docRef = getDocRef(this.collection, id);
		const doc = await getDoc<T["schema"]>(docRef);
		return { ...doc.data(), id: doc.id } as WithId<T["schema"]>;
	}

	async create(doc: T["schema"]): Promise<string> {
		const newDocRef = await addDoc(this.collection, doc);
		return newDocRef.id;
	}

	async update(id: string, doc: Partial<T["schema"]>): Promise<void> {
		const docRef = getDocRef(this.collection, id);
		await updateDoc(docRef, doc as UpdateData<T["schema"]>);
	}

	async delete(id: string): Promise<void> {
		const docRef = getDocRef(this.collection, id);
		await deleteDoc(docRef);
	}

	subscribe(callback: (docs: WithId<T["schema"]>[]) => void): () => void {
		const unsubscribe = onSnapshot(
			this.collection,
			{ includeMetadataChanges: false },
			(snapshot) => {
				const docs = snapshot.docs.map(
					(doc) => ({ ...doc.data(), id: doc.id } as WithId<T["schema"]>)
				);
				callback(docs);
			}
		);

		return unsubscribe;
	}
}
