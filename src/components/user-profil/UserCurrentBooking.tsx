import { IconBooking } from "@components/shared/Icons/mod";
import { Link } from "@components/shared/Link/Link";
import type { UserBookingsType } from "@types";
import { DateFormatter } from "@yttiiz/utils";

export const UserCurrentBookings = ({
	bookings,
}: {
	bookings:
		| {
				ok: boolean;
				data: UserBookingsType[];
		  }
		| {
				ok: boolean;
				message: string;
		  };
}) => {
	const hasBookings = "data" in bookings;

	return (
		<div className="flex flex-col gap-1">
			<p className="flex flex-col gap-1.5 text-sm sm:flex-row sm:items-center">
				<IconBooking className="size-5" />
				{hasBookings
					? "Vos réservations effectuées"
					: "Aucune réservation effectuée pour le moment"}
			</p>
			{hasBookings ? (
				<ul className="pt-1">
					{bookings.data.map((booking) => (
						<li
							key={booking.bookingId}
							className="not-last:pb-0.5"
						>
							<Link
								href="/booking"
								type="link"
								variant="black"
								value={
									<span className="text-xs">
										<strong className="font-medium">
											Aka {booking.product.name}
										</strong>{" "}
										du{" "}
										{DateFormatter.display({
											date: new Date(booking.startingDate),
											style: "short",
										})}{" "}
										au{" "}
										{DateFormatter.display({
											date: new Date(booking.endingDate),
											style: "short",
										})}
									</span>
								}
							/>
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
};
