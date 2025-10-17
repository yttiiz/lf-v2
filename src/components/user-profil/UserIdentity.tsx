import { useUpdate } from "@better-auth";
import { useGetUserBookings } from "@components/booking/hook";
import { Button } from "@components/shared/Button/Button";
import { IconBooking } from "@components/shared/Icons/IconBooking";
import { Input } from "@components/shared/Input/Input";
import { Logout } from "@components/shared/Logout/Logout";
import { Modal } from "@components/shared/Modal/Modal";
import { Avatar, Divider, Spinner, useDisclosure } from "@heroui/react";
import { user, useStore } from "@store";
import { errorToast, successToast } from "@utils";
import { DateFormatter } from "@yttiiz/utils";
import { useState } from "react";
import { Card } from "./Card";
import { UserCurrentBookings } from "./UserCurrentBooking";

export const UserIdentity = () => {
	const $user = useStore(user);

	// Fetching
	const { data: bookings, isPending } = useGetUserBookings($user?.id ?? "");
	const bookingsIsOk = !!bookings && "ok" in bookings && bookings.ok;

	// Hooks
	const { handleUserUpdate, validateName } = useUpdate();

	// States
	const [currentFirstName, currentLastName] = $user?.name.split(" ") ?? "";
	const [firstname, setFirstName] = useState(currentFirstName);
	const [lastname, setLastName] = useState(currentLastName);

	const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
	const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");

	// Handlers
	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
	const onFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.currentTarget.value ? setFirstNameErrorMessage("") : null;
		setFirstName(event.currentTarget.value);
	};

	const onLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.currentTarget.value ? setLastNameErrorMessage("") : null;
		setLastName(event.currentTarget.value);
	};

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const newFirstname = formData.get("firstName")?.toString();
		const newLastname = formData.get("lastName")?.toString();

		if (newFirstname && newLastname) {
			const verifyFirstName = validateName(newFirstname, "prénom");
			const verifyLastName = validateName(newLastname, "nom");

			if (verifyFirstName || verifyLastName) {
				verifyFirstName ? setFirstNameErrorMessage(verifyFirstName) : null;
				verifyLastName ? setLastNameErrorMessage(verifyLastName) : null;
				return;
			}

			// Close modal.
			onClose();

			const result = await handleUserUpdate({
				name: `${newFirstname} ${newLastname}`,
			});

			if (result.success) {
				successToast({
					title: "Félicitations",
					description: "Votre profil a bien été mis à jour.",
				});
			} else {
				errorToast({
					title: "Erreur",
					description: result.message,
				});
			}
		}
	};

	return (
		<>
			<Card>
				<div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
					<div className="flex w-full flex-col gap-4">
						<div className="flex w-full flex-col gap-4 md:flex-row md:items-start">
							<div>
								<Avatar
									src={$user?.image ?? ""}
									name={`${firstname.slice(0, 1)}${lastname.slice(0, 1)}`}
									size="lg"
								/>
							</div>
							<div className="grid w-full">
								<h4 className="font-semibold">Mon profil</h4>
								<p className="w-full truncate">{`${firstname} ${lastname}`}</p>
								<p className="font-light text-sm">
									{`Compte créé le ${DateFormatter.display({
										date: $user?.createdAt,
										style: "normal",
									})}`}
								</p>
								<div className="mt-4">
									<Logout />
								</div>
							</div>
						</div>
						<Divider />
						<div>
							{isPending ? (
								<Spinner
									size="sm"
									className="flex items-start"
								/>
							) : bookingsIsOk ? (
								<UserCurrentBookings bookings={bookings} />
							) : (
								<p className="!text-warning flex flex-col gap-1.5 text-sm sm:flex-row sm:items-center">
									<IconBooking className="size-5 text-warning" />
									Impossible d'afficher vos réservations.
								</p>
							)}
						</div>
					</div>
					<div>
						<Button
							value="Mettre à jour"
							type="button"
							variant="terciary"
							onClick={onOpen}
						/>
					</div>
				</div>
			</Card>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				onOpenChange={onOpenChange}
				headerTitle="Modifier votre identité"
				bodyContent={
					<form
						method="POST"
						onSubmit={onSubmit}
					>
						<div className="mb-8 flex flex-col gap-4">
							<Input
								label="Prénom"
								placeholder="Votre prénom..."
								name="firstName"
								type="text"
								value={firstname}
								required
								startContent="user"
								feedbackMessage={firstNameErrorMessage}
								onChange={onFirstNameChange}
							/>
							<Input
								label="Nom"
								placeholder="Votre nom..."
								name="lastName"
								type="text"
								value={lastname}
								required
								startContent="user"
								feedbackMessage={lastNameErrorMessage}
								onChange={onLastNameChange}
							/>
						</div>
						<Button
							type="submit"
							value={"Envoyer"}
							variant="primary"
							size="full"
							className="text-lg"
						/>
					</form>
				}
			/>
		</>
	);
};
