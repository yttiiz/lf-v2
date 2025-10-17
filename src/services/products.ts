import { Mongo } from "@db";
import type {
	ProductSchemaWithIDType,
	ReviewsProductSchemaWithIDType,
} from "@types";

export const getProductsService = async (params: string) => {
	const db = import.meta.env.DATABASE_NAME;

	try {
		const products = await Mongo.getDocumentsFrom<ProductSchemaWithIDType>({
			db,
			collection: "products",
		});

		if (!(params && params.includes("withReview"))) {
			return products;
		}

		const reviews =
			await Mongo.getDocumentsFrom<ReviewsProductSchemaWithIDType>({
				db,
				collection: "reviews",
			});

		const productsAndReview = products.reduce(
			(productWithReview, product) => {
				for (const review of reviews) {
					if (review.productId === product._id.toString()) {
						productWithReview.push({ ...product, review });
					}
				}
				return productWithReview;
			},
			[] as (ProductSchemaWithIDType & {
				review: ReviewsProductSchemaWithIDType;
			})[],
		);

		return productsAndReview;
	} catch (error: any) {
		return { message: error.message };
	}
};
