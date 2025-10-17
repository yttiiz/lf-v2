import { Button } from "@components/shared/Button/Button";
import { IconTrash } from "@components/shared/Icons/mod";
import { ToastProvider } from "@components/shared/ToastProvider/ToastProvider";
import { user, useStore } from "@store";
import { BookingHandler, errorToast, formatPrice, successToast } from "@utils";
import { useDeleteBooking } from "./hook";

export const UserBookingsCardAmount = ({
	booking: { startingDate, endingDate, createdAt },
	price,
	bookingId,
	refetch,
}: {
	booking: {
		startingDate: string;
		endingDate: string;
		createdAt: number;
	};
	price: number;
	bookingId: string;
	refetch: () => void;
}) => {
	const mutation = useDeleteBooking();
	const $user = useStore(user);

	const numberOfDays = BookingHandler.getDaysNumber(startingDate, endingDate);
	const isBookingNotHappendYet = new Date(startingDate).getTime() > Date.now();

	return (
		<div className="flex h-auto flex-col justify-between">
			<div className="md:text-right">
				<strong>Montant total</strong>
				<p>
					pour{" "}
					<strong>
						{numberOfDays} nuit
						{numberOfDays > 1 ? "s" : ""}
					</strong>{" "}
					à {formatPrice(price)}
				</p>
				<strong className="text-3xl">
					{formatPrice(price * numberOfDays)}
				</strong>
			</div>
			{isBookingNotHappendYet ? (
				<ToastProvider>
					<div className="pt-6 md:pt-0">
						<form
							onSubmit={async (event) => {
								event.preventDefault();

								const data = {
									userId: $user?.id ?? "",
									userName: $user?.name ?? "",
									startingDate,
									endingDate,
									createdAt,
								};

								mutation?.mutate(
									{ id: bookingId, data },
									{
										onSuccess: (data) => {
											data.ok
												? successToast({
														title: "Réservation annulée",
														description: data.message,
													})
												: errorToast({
														title: "Erreur",
														description: data.message,
													});
											refetch();
										},
										onError: (data) =>
											errorToast({
												title: "Erreur",
												description: data.message,
											}),
									},
								);
							}}
						>
							<Button
								type="submit"
								value="Annuler la réservation"
								variant="danger"
								endContent={<IconTrash className="size-5" />}
							/>
						</form>
					</div>
				</ToastProvider>
			) : null}
		</div>
	);
};
