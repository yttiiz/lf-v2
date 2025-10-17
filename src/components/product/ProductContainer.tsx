import { Spinner } from "@heroui/react";
import { currentBookingId, currentProduct, currentReviewId } from "@store";
import { useGetProduct } from "./hook";
import { Product } from "./Product";
import { ProductNotFound } from "./ProductNotFound";

export const ProductContainer = ({ id }: { id: string }) => {
	const { data, isPending } = useGetProduct(id);
	const isDataOk = !!data && !("message" in data);

	if (isPending) {
		return (
			<div className="flex h-[var(--dvh-header)] items-center justify-center">
				<Spinner
					size="lg"
					color="primary"
					label="Chargement..."
				/>
			</div>
		);
	}

	if (isDataOk) {
		// Set current product details
		const { product, productBookings, reviewId } = data;
		currentProduct.set({
			id,
			name: product.name,
			type: product.details.type,
			price: product.details.price,
		});

		// Set current booking id
		currentBookingId.set(productBookings._id.toString());

		// Set current review id
		currentReviewId.set(reviewId);

		return <Product data={{ product, productBookings }} />;
	}

	return <ProductNotFound />;
};
