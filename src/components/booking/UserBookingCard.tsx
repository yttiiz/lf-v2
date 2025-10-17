import { Divider } from "@heroui/react";
import type { UserBookingsType } from "@types";
import { UserBookingsCardAmount } from "./UserBookingCardAmount";
import { UserBookingsCardHeader } from "./UserBookingsCardHeader";
import { UserBookingsCardProduct } from "./UserBookingsCardProduct";

export const UserBookingCard = ({
	data: {
		bookingId,
		productId,
		startingDate,
		createdAt,
		endingDate,
		product,
		reviews,
	},
	refetch,
}: {
	data: UserBookingsType;
	refetch: () => void;
}) => {
	const rates = reviews.map((reviews) => reviews.rate);
	const linkToProduct = `/product/${productId}`;

	return (
		<div className="overflow-hidden rounded-xl border border-grey-dark/50">
			<UserBookingsCardHeader
				createdAt={createdAt}
				startingDate={startingDate}
				endingDate={endingDate}
			/>
			<div className="flex flex-col gap-4 p-6 md:flex-row md:justify-between">
				<UserBookingsCardProduct
					product={product}
					linkToProduct={linkToProduct}
					rates={rates}
				/>
				<Divider className="md:hidden" />
				<UserBookingsCardAmount
					refetch={refetch}
					booking={{ startingDate, endingDate, createdAt }}
					price={product.details.price}
					bookingId={bookingId}
				/>
			</div>
		</div>
	);
};
