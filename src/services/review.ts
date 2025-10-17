import { Mongo } from "@db";
import type { AddReviewToProductType, ProductSchemaWithIDType } from "@types";
import { ObjectId } from "mongodb";

export const getReviewService = async (id: string) => {
	try {
		return await Mongo.getDocumentFrom({
			db: import.meta.env.DATABASE_NAME,
			collection: "reviews",
			identifier: new ObjectId(id),
			key: "_id",
		});
	} catch (error: any) {
		return {
			message: error.message,
		};
	}
};

export const postReviewToProductService = async ({
	id,
	review,
	reviewId,
	userId,
	userName,
	rate,
}: AddReviewToProductType) => {
	const db = import.meta.env.DATABASE_NAME;
	const newReview = {
		userId,
		userName,
		rate: +rate,
		comment: review,
		timestamp: Date.now(),
	};

	try {
		const product = await Mongo.getDocumentFrom<ProductSchemaWithIDType>({
			db,
			collection: "products",
			identifier: new ObjectId(id),
			key: "_id",
		});

		if (!product) {
			return {
				ok: false,
				message:
					"Vous ne pouvez pas laisser un avis ou noter ce logement. Veuillez recommencer ultérieurement.",
				status: 200,
			};
		}

		const { acknowledged } = await Mongo.putDocumentArrayKeyTo({
			db,
			collection: "reviews",
			identifier: newReview,
			key: "reviews",
			id: new ObjectId(reviewId),
		});

		return acknowledged
			? {
					ok: true,
					message: `Votre ${
						review ? "avis et votre note ont" : "note a"
					} bien été pris en compte !`,
					status: 200,
				}
			: {
					ok: false,
					message:
						"Votre avis n'a pas pu être pris en compte. Veuillez réessayer ultérieurement.",
					status: 200,
				};
	} catch (error: any) {
		return { ok: false, message: error.message, status: 500 };
	}
};
