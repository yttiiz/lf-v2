import { Mongo } from "@db";
import type {
	BookingsProductSchemaWithIDType,
	ProductSchemaWithIDType,
} from "@types";
import { ObjectId } from "mongodb";

export const getProductService = async (id: string | undefined) => {
	const db = import.meta.env.DATABASE_NAME;

	try {
		const product = await Mongo.getDocumentFrom<ProductSchemaWithIDType>({
			db,
			collection: "products",
			identifier: new ObjectId(id),
			key: "_id",
		});

		if (!product) {
			return {
				message:
					"Appartement inaccessible pour le moment. Veuillez réessayez ultérieurement.",
			};
		}

		const productBookings =
			await Mongo.getDocumentFrom<BookingsProductSchemaWithIDType>({
				db,
				collection: "bookings",
				identifier: product._id.toString(),
				key: "productId",
			});

		return {
			product,
			reviewId: product.reviewId,
			productBookings: productBookings ?? {},
		};
	} catch (error: any) {
		return { message: error.message };
	}
};
