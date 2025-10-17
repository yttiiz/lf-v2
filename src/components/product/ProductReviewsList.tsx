import { H3 } from "@components/shared/Heading/H3";
import { Spinner } from "@heroui/react";
import { isUserConnected, useStore } from "@store";
import type { ReviewsProductSchemaWithIDType } from "@types";
import { ProductReviewsListCard } from "./ProductReviewsListCard";

export const ProductReviewsList = ({
	reviews,
}: {
	reviews: ReviewsProductSchemaWithIDType | { message: string } | undefined;
}) => {
	const $isUserConnected = useStore(isUserConnected);
	const isReviewsOk = !!reviews && !("message" in reviews);

	return (
		<div id="reviews">
			<H3 className="mb-4 border-grey-dark/40 border-b pb-4">
				Qu'en pensent ceux qui y ont séjourné ?
			</H3>
			<div className="w-full lg:w-[50%]">
				{isReviewsOk ? (
					reviews.reviews.length === 0 ? (
						<p>
							{`Il n'y a pas encore d'avis pour le moment. N'hésitez pas à donner le
					vôtre${!$isUserConnected ? ", en vous connectant." : "."}`}
						</p>
					) : (
						<ProductReviewsListCard reviews={reviews.reviews} />
					)
				) : (
					<div className="flex justify-center">
						<Spinner
							size="lg"
							color="primary"
							label="Chargement..."
						/>
					</div>
				)}
			</div>
		</div>
	);
};
