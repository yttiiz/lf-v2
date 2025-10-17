import type {
	DeleteDocumentToParameterType,
	GetDocumentFromParameterType,
	GetDocumentsFromParameterType,
	PostDocumentToParameterType,
	PutDocumentKeyToParameterType,
	PutDocumentToParameterType,
} from "@types";
import type { Document } from "mongodb";
import {
	type Db,
	type Filter,
	type MatchKeysAndValues,
	MongoClient,
	type OptionalUnlessRequiredId,
} from "mongodb";

export class Mongo {
	public static client = Mongo.initClient();
	private static database: Db | undefined;

	private static initClient() {
		let url = "mongodb://localhost:27017/flamboyants";

		if (import.meta.env.PROD) {
			const {
				DATABASE_USERNAME: username,
				DATABASE_PASSWORD: password,
				DATABASE_HOST: host,
			} = import.meta.env;

			url = `mongodb+srv://${username}:${password}@${host}/?authMechanism=SCRAM-SHA-1`;
		}

		return new MongoClient(url);
	}

	public static getDatabase(db: string) {
		if (!Mongo.database) {
			Mongo.database = Mongo.client.db(db);
		}

		return Mongo.database;
	}

	public static async getDocumentsFrom<T extends Document = Document>({
		db,
		collection,
	}: GetDocumentsFromParameterType) {
		return await Mongo.getDatabase(db)
			.collection<T>(collection)
			.find()
			.toArray();
	}

	public static async getDocumentFrom<T extends Document = Document>({
		db,
		collection,
		identifier,
		key,
	}: GetDocumentFromParameterType<T>) {
		return await Mongo.getDatabase(db)
			.collection<T>(collection)
			.findOne({ [key]: identifier } as Filter<T>);
	}

	public static async postDocumentTo<T extends Document = Document>({
		db,
		collection,
		data,
	}: PostDocumentToParameterType<T>) {
		return await Mongo.getDatabase(db)
			.collection<T>(collection)
			.insertOne({
				...data,
			} as unknown as OptionalUnlessRequiredId<T>);
	}

	public static async putDocumentObjectKeyTo<T extends Document = Document>({
		db,
		collection,
		identifier,
		key,
		id,
	}: PutDocumentKeyToParameterType<T>) {
		return await Mongo.getDatabase(db)
			.collection<T>(collection)
			.updateOne({ _id: id } as Filter<T>, {
				$set: { [key]: identifier } as unknown as MatchKeysAndValues<T>,
			});
	}

	public static async putDocumentArrayKeyTo<T extends Document = Document>({
		db,
		collection,
		identifier,
		key,
		id,
	}: PutDocumentKeyToParameterType<T>) {
		return await Mongo.getDatabase(db)
			.collection<T>(collection)
			.updateOne({ _id: id } as Filter<T>, {
				$push: { [key]: identifier } as unknown as MatchKeysAndValues<T>,
			});
	}

	public static async putDocumentTo<T extends Document = Document>({
		db,
		collection,
		data,
		id,
	}: PutDocumentToParameterType<T>) {
		return await Mongo.getDatabase(db)
			.collection<T>(collection)
			.updateOne({ _id: id } as Filter<T>, {
				$set: { ...data } as unknown as MatchKeysAndValues<T>,
			});
	}

	public static async deleteDocumentArrayTo<T extends Document = Document>({
		db,
		collection,
		identifier,
		key,
		id,
	}: DeleteDocumentToParameterType<T>) {
		return await Mongo.getDatabase(db)
			.collection<T>(collection)
			.updateOne({ _id: id } as Filter<T>, {
				$pull: { [key]: identifier } as unknown as MatchKeysAndValues<T>,
			});
	}
}
