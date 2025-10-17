import { Button } from "@components/shared/Button/Button";
import { H3 } from "@components/shared/Heading/H3";
import { Input } from "@components/shared/Input/Input";
import { Link } from "@components/shared/Link/Link";
import { Modal } from "@components/shared/Modal/Modal";
import { Divider, useDisclosure } from "@heroui/react";
import {
	currentBookingId,
	currentProduct,
	isUserConnected,
	user,
	useStore,
} from "@store";
import type { BookingsProductSchemaWithIDType } from "@types";
import { formatPrice, limitDates } from "@utils";
import { DateFormatter } from "@yttiiz/utils";
import { useState } from "react";
import { useBookAProduct, useValidator } from "./hook";

export const ProductBooking = ({
	bookings: { bookings },
	price,
}: {
	bookings: BookingsProductSchemaWithIDType;
	price: number;
}) => {
	const $user = useStore(user);
	const $isUserConnected = useStore(isUserConnected);
	const $bookingId = useStore(currentBookingId);
	const $currentProduct = useStore(currentProduct);

	const {
		isOpen: isUserConnectedModalOpen,
		onOpen: onUserConnectedModalOpen,
		onClose: onUserConnectedModalClose,
		onOpenChange: onUserConnectedModalOpenChange,
	} = useDisclosure();

	const {
		isOpen: isBookingResultModalOpen,
		onOpen: onBookingResultModalOpen,
		onClose: onBookingResultModalClose,
		onOpenChange: onBookingResultModalOpenChange,
	} = useDisclosure();

	const [minDate, setMinDate] = useState(limitDates().min);
	const [startingDate, setStartingDate] = useState<string | null>(null);
	const [endingDate, setEndingDate] = useState<string | null>(null);
	const [startingDateErrorMessage, setStartingDateErrorMessage] = useState("");
	const [endingDateErrorMessage, setEndingDateErrorMessage] = useState("");

	const [bookingResultMessage, setBookingResultMessage] = useState("");

	const { validateInputDate, getProductAvailability } = useValidator();
	const { isAvailable, lastDayBeforeAvailability } =
		getProductAvailability(bookings);

	const mutation = useBookAProduct();

	const onStartingDateInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setMinDate(event.currentTarget.value);
		setStartingDate(event.currentTarget.value);
	};

	const onEndingDateInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setEndingDate(event.currentTarget.value);
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!$isUserConnected) {
			return onUserConnectedModalOpen();
		}

		if (startingDate && endingDate) {
			const verifyStartingDate = validateInputDate(startingDate);
			const verifyEndingDate = validateInputDate(endingDate);

			if (verifyStartingDate || verifyEndingDate) {
				verifyStartingDate
					? setStartingDateErrorMessage(verifyStartingDate)
					: null;
				verifyEndingDate ? setEndingDateErrorMessage(verifyEndingDate) : null;

				return;
			}

			mutation.mutate(
				{
					id: $bookingId,
					user: {
						id: $user?.id ?? "",
						name: $user?.name ?? "",
						email: $user?.email ?? "",
					},
					product: {
						name: $currentProduct?.name ?? "",
						type: $currentProduct?.type ?? "",
						price: $currentProduct?.price ?? 0,
					},
					startingDate,
					endingDate,
				},
				{
					onSuccess: (data) => {
						setBookingResultMessage(data.message);
						onBookingResultModalOpen();
					},
					onError: (data) => {
						setBookingResultMessage(data.message);
						onBookingResultModalOpen();
					},
				},
			);

			setMinDate(limitDates().min);
		}
	};

	return (
		<div className="w-full lg:absolute lg:top-full lg:right-0 lg:z-5 lg:w-[50%] lg:p-8">
			<div className="booking overflow-hidden bg-white lg:rounded-xl lg:shadow">
				<div className="flex flex-col items-center gap-4 p-8">
					<span className="flex flex-col items-center">
						<strong className="font-bold text-4xl text-terciary">
							{formatPrice(price)}
						</strong>
						la nuit
					</span>
					<Divider className="bg-grey-dark/20" />
					<span className="flex items-center gap-2">
						<span
							className={`${
								isAvailable ? "bg-success" : "bg-danger"
							} size-3 rounded-full`}
						/>
						<strong className="font-medium">
							{isAvailable
								? "disponible"
								: `disponible à partir du ${DateFormatter.display({
										date: new Date(lastDayBeforeAvailability),
										style: "short",
									})}`}
						</strong>
					</span>
				</div>

				<div className="grid gap-6 bg-grey-dark/20 p-8">
					<H3 className="text-center font-bold">Choisissez votre créneau</H3>
					<form
						method="POST"
						onSubmit={onSubmit}
					>
						<div className="mb-8 flex flex-col gap-4">
							<Input
								label="Début de séjour"
								type="date"
								name="starting-date"
								required
								min={minDate}
								feedbackMessage={startingDateErrorMessage}
								onChange={onStartingDateInputChange}
							/>
							<Input
								label="Fin de séjour"
								type="date"
								name="ending-date"
								required
								min={minDate}
								feedbackMessage={endingDateErrorMessage}
								onChange={onEndingDateInputChange}
							/>
						</div>
						<Button
							type="submit"
							value="Validez vos dates"
							size="full"
							className="text-md"
						/>
					</form>
				</div>
			</div>
			<Modal
				isOpen={isUserConnectedModalOpen}
				onClose={onUserConnectedModalClose}
				onOpenChange={onUserConnectedModalOpenChange}
				headerTitle="Connectez-vous !"
				bodyContent={
					<div className="grid gap-4">
						<p>Vous devez être connecté(e) pour réserver cet appartement.</p>
						<div className="flex items-center justify-end gap-4">
							<Link
								value="Se connecter"
								type="link"
								href="/login"
							/>
							<Link
								value="Créer un compte"
								type="button"
								href="/register"
							/>
						</div>
					</div>
				}
			/>
			<Modal
				isOpen={isBookingResultModalOpen}
				onClose={onBookingResultModalClose}
				onOpenChange={onBookingResultModalOpenChange}
				headerTitle="Votre réservation"
				bodyContent={
					<div className="grid gap-4">
						<p dangerouslySetInnerHTML={{ __html: bookingResultMessage }} />
					</div>
				}
			/>
		</div>
	);
};
