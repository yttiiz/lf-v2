import { H1 } from "@components/shared/Heading/H1";
import { currentReviewId, useStore } from "@store";
import type {
	BookingsProductSchemaWithIDType,
	ProductSchemaWithIDType,
} from "@types";
import { useGetReview } from "./hook";
import { ProductBooking } from "./ProductBooking";
import { ProductDescription } from "./ProductDescription";
import { ProductFigure } from "./ProductFigure";
import { ProductReviewForm } from "./ProductReviewForm";
import { ProductReviewsList } from "./ProductReviewsList";

export const Product = ({
	data: { product, productBookings },
}: {
	data: {
		product: ProductSchemaWithIDType;
		productBookings: BookingsProductSchemaWithIDType;
	};
}) => {
	const $reviewId = useStore(currentReviewId);
	const { data: reviews, refetch } = useGetReview($reviewId);

	return (
		<section>
			<div className="container flex min-h-[var(--dvh-header)] flex-col gap-6">
				<div>
					<H1>Aka {product.name}</H1>
					<p>{product.description}</p>
				</div>
				<div className="relative overflow-hidden rounded-2xl shadow lg:overflow-visible lg:shadow-none">
					<ProductFigure
						pictures={product.pictures}
						reviews={reviews}
					/>
					<ProductBooking
						bookings={productBookings}
						price={product.details.price}
					/>
				</div>
				<div className="flex flex-col gap-8">
					<ProductDescription details={product.details} />
					<ProductReviewsList reviews={reviews} />
					<ProductReviewForm refetch={refetch} />
				</div>
			</div>
		</section>
	);
};
