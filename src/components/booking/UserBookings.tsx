import { Spinner } from "@heroui/react";
import { user, useStore } from "@store";
import { BookingNotFound } from "./BookingNotFound";
import { useGetUserBookings } from "./hook";
import { UserBookingCard } from "./UserBookingCard";

export const UserBookings = () => {
	const $user = useStore(user);
	const {
		data: bookings,
		isPending,
		refetch,
	} = useGetUserBookings($user?.id ?? "");

	const isBookingsOk = !!bookings;
	const isBookingsHasData = isBookingsOk && "data" in bookings;
	const isBookingsHasMessage = isBookingsOk && "message" in bookings;

	if (isPending) {
		return (
			<div className="flex h-full items-center justify-center">
				<Spinner
					size="lg"
					color="primary"
					label="Chargement..."
				/>
			</div>
		);
	}

	if (isBookingsHasData) {
		return (
			<ul className="flex w-full flex-col gap-8">
				{bookings.data.map((booking) => (
					<li key={booking.createdAt}>
						<UserBookingCard
							data={booking}
							refetch={refetch}
						/>
					</li>
				))}
			</ul>
		);
	}

	if (isBookingsHasMessage) {
		return (
			<div className="flex h-full items-center justify-center">
				<BookingNotFound message={bookings.message} />
			</div>
		);
	}

	return (
		<div className="flex h-full items-center justify-center">
			<BookingNotFound message="Il y a eu un souci venant du serveur. Veuillez consulter cette page ultérieurement." />
		</div>
	);
};
