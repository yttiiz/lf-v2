import { useAuth, useUpdate } from "@better-auth";
import { Button } from "@components/shared/Button/Button";
import { Input } from "@components/shared/Input/Input";
import { InputPassword } from "@components/shared/Input/InputPassword";
import { Modal } from "@components/shared/Modal/Modal";
import { Divider, useDisclosure } from "@heroui/react";
import { user, useStore } from "@store";
import { errorToast, successToast } from "@utils";
import { useState } from "react";
import { Card } from "./Card";

export const UserConnexion = () => {
	const $user = useStore(user);
	const {
		isOpen: isEmailModalOpen,
		onOpen: onEmailModalOpen,
		onClose: onEmailModalClose,
		onOpenChange: onEmailModalOpenChange,
	} = useDisclosure();

	const {
		isOpen: isPasswordModalOpen,
		onOpen: onPasswordModalOpen,
		onClose: onPasswordModalClose,
		onOpenChange: onPasswordModalOpenChange,
	} = useDisclosure();

	// States
	const [email, setEmail] = useState($user?.email);
	const [emailErrorMessage, setEmailErrorMessage] = useState("");
	const [oldPasswordErrorMessage, setOldPasswordErrorMessage] = useState("");
	const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");
	const { validateEmail, validatePassword } = useAuth();
	const { handleChangePassword, handleChangeEmail } = useUpdate();

	// Handlers
	const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.currentTarget.value ? setEmailErrorMessage("") : null;
		setEmail(event.currentTarget.value);
	};
	const onOldPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.currentTarget.value ? setOldPasswordErrorMessage("") : null;
	};
	const onNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.currentTarget.value ? setNewPasswordErrorMessage("") : null;
	};

	const onEmailUpdateSubmit = async (
		event: React.FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const newEmail = formData.get("email")?.toString();

		if (newEmail) {
			const verifyEmail = validateEmail(newEmail);

			if (verifyEmail) return setEmailErrorMessage(verifyEmail);

			onEmailModalClose();

			const result = await handleChangeEmail(newEmail);

			if (result.success) {
				successToast({
					title: "Félicitations",
					description: "Votre email a bien été mis à jour.",
				});
			} else {
				errorToast({
					title: "Erreur",
					description: result.message,
				});
			}
		}
	};

	const onPasswordUpdateSubmit = async (
		event: React.FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const oldPassword = formData.get("old-password")?.toString();
		const newPassword = formData.get("new-password")?.toString();

		if (oldPassword && newPassword) {
			const verifyOldPassword = validatePassword(oldPassword);
			const verifyNewPassword = validatePassword(newPassword);

			if (verifyOldPassword || verifyNewPassword) {
				verifyOldPassword
					? setOldPasswordErrorMessage(verifyOldPassword)
					: null;
				verifyNewPassword
					? setNewPasswordErrorMessage(verifyNewPassword)
					: null;
				return;
			}

			onPasswordModalClose();

			const result = await handleChangePassword({
				currentPassword: oldPassword,
				newPassword,
			});

			if (result.success) {
				successToast({
					title: "Félicitations",
					description: "Votre mot de passe a bien été mis à jour.",
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
				<div className="grid gap-4">
					<div className="sm-gap-8 flex flex-col gap-2 sm:flex-row sm:justify-between">
						<div className="flex w-full flex-col gap-4">
							<div>
								<h4 className="font-semibold">Email</h4>
								<p>{email}</p>
							</div>
						</div>
						<div>
							<Button
								value="Mettre à jour"
								type="button"
								variant="terciary"
								onClick={onEmailModalOpen}
							/>
						</div>
					</div>
					<Divider />
					<div className="sm-gap-8 flex flex-col gap-2 sm:flex-row sm:justify-between">
						<div className="flex w-full flex-col gap-4">
							<div>
								<h4 className="font-semibold">Mot de passe</h4>
								<p>•••••••••••••••</p>
							</div>
						</div>
						<div>
							<Button
								value="Changer de mot de passe"
								type="button"
								variant="terciary"
								onClick={onPasswordModalOpen}
							/>
						</div>
					</div>
				</div>
			</Card>
			<Modal
				isOpen={isEmailModalOpen}
				onClose={onEmailModalClose}
				onOpenChange={onEmailModalOpenChange}
				headerTitle="Modifier votre email"
				bodyContent={
					<form
						method="POST"
						onSubmit={onEmailUpdateSubmit}
					>
						<div className="mb-8 flex flex-col gap-4">
							<Input
								label="Email"
								value={email}
								placeholder="Votre email..."
								name="email"
								type="email"
								required
								startContent="email"
								feedbackMessage={emailErrorMessage}
								onChange={onEmailChange}
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
			<Modal
				isOpen={isPasswordModalOpen}
				onClose={onPasswordModalClose}
				onOpenChange={onPasswordModalOpenChange}
				headerTitle="Modifier votre mot de passe"
				bodyContent={
					<form
						method="POST"
						onSubmit={onPasswordUpdateSubmit}
					>
						<div className="mb-8 flex flex-col gap-6">
							<InputPassword
								label="Ancien mot de passe"
								placeholder="Votre ancien mot de passe..."
								name="old-password"
								required
								feedbackMessage={oldPasswordErrorMessage}
								onChange={onOldPasswordChange}
							/>
							<div>
								<h4 className="font-semibold text-warning">
									Votre nouveau mot de passe doit comporter au moins 6
									caractères.
								</h4>
								<InputPassword
									label="Nouveau mot de passe"
									placeholder="Votre nouveau mot de passe..."
									name="new-password"
									required
									feedbackMessage={newPasswordErrorMessage}
									onChange={onNewPasswordChange}
								/>
							</div>
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
