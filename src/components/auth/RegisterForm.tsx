import { useAuth } from "@better-auth";
import { ImageCropper } from "@components/shared/ImageCropper/ImageCropper";
import { InputFile } from "@components/shared/Input/InputFile";
import { Modal } from "@components/shared/Modal/Modal";
import { ToastProvider } from "@components/shared/ToastProvider/ToastProvider";
import { useDisclosure } from "@heroui/react";
import { errorToast } from "@utils";
import { useState } from "react";
import type { Area } from "react-easy-crop";
import { Button } from "../shared/Button/Button";
import { Input } from "../shared/Input/Input";
import { InputPassword } from "../shared/Input/InputPassword";
import { Link } from "../shared/Link/Link";
import { handleUserRegistration, onCropDone, useUploadImage } from "./hook";

export const RegisterForm = () => {
	const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
	const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
	const [emailErrorMessage, setEmailErrorMessage] = useState("");
	const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
	const [fileErrorMessage, setFileErrorMessage] = useState("");

	const [file, setFile] = useState<File | null>(null);

	const { validateEmail, validatePassword, validateName, validateFile } =
		useAuth();
	const mutation = useUploadImage();

	const onFistNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.currentTarget.value ? setFirstNameErrorMessage("") : null;
	};
	const onLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.currentTarget.value ? setLastNameErrorMessage("") : null;
	};
	const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.currentTarget.value ? setEmailErrorMessage("") : null;
	};
	const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.currentTarget.value ? setPasswordErrorMessage("") : null;
	};

	// Image Cropper
	const [image, setImage] = useState<string | ArrayBuffer | undefined | null>(
		"",
	);
	const [croppedArea, setCroppedArea] = useState<Area | null>(null);
	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

	const onImageSelected = (
		imageSelected: string | ArrayBuffer | undefined | null,
	) => {
		setImage(imageSelected);
		onOpen();
	};

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Reset error messages
		setFirstNameErrorMessage("");
		setLastNameErrorMessage("");
		setEmailErrorMessage("");
		setPasswordErrorMessage("");
		setFileErrorMessage("");

		const formData = new FormData(event.currentTarget);
		const firstName = formData.get("firstName") as string;
		const lastName = formData.get("lastName") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		setFile(formData.get("file") as File);

		// Client-side validation
		const firstNameError = validateName(firstName);
		const lastNameError = validateName(lastName);
		const emailError = validateEmail(email);
		const passwordError = validatePassword(password);
		const fileError = validateFile(file);

		if (firstNameError) return setFirstNameErrorMessage(firstNameError);
		if (lastNameError) return setLastNameErrorMessage(lastNameError);
		if (emailError) return setEmailErrorMessage(emailError);
		if (passwordError) return setPasswordErrorMessage(passwordError);
		if (fileError) return setFileErrorMessage(fileError);

		if (!file) {
			// Attempt sign up
			return await handleUserRegistration({
				firstName,
				lastName,
				email,
				password,
				setEmailErrorMessage,
			});
		}

		const imageformData = new FormData();
		imageformData.append("image", file);

		mutation.mutate(imageformData, {
			onSuccess: async (data) => {
				if (data.ok) {
					// Attempt sign up
					return await handleUserRegistration({
						firstName,
						lastName,
						email,
						password,
						image: data.message,
						setEmailErrorMessage,
					});
				}

				errorToast({
					title: "Erreur",
					description: data.message,
				});
			},
			onError: (data) =>
				errorToast({
					title: "Erreur",
					description: data.message,
				}),
		});
	};

	return (
		<>
			<ToastProvider>
				<div
					id="register-form"
					className="m-auto w-full rounded-2xl border border-grey-dark/30 bg-white shadow md:w-[400px]"
				>
					<h3 className="border-b border-b-grey-dark/30 p-8 text-center font-medium text-2xl text-primary">
						Renseignez vos identifiants
					</h3>
					<form
						onSubmit={onSubmit}
						className="p-8"
					>
						<div className="mb-8 flex flex-col gap-4">
							<Input
								label="Prénom"
								placeholder="Votre prénom..."
								name="firstName"
								type="text"
								required
								startContent="user"
								feedbackMessage={firstNameErrorMessage}
								onChange={onFistNameChange}
							/>
							<Input
								label="Nom"
								placeholder="Votre nom..."
								name="lastName"
								type="text"
								required
								startContent="user"
								feedbackMessage={lastNameErrorMessage}
								onChange={onLastNameChange}
							/>
							<Input
								label="Email"
								placeholder="Votre email..."
								name="email"
								type="email"
								required
								startContent="email"
								feedbackMessage={emailErrorMessage}
								onChange={onEmailChange}
							/>
							<InputPassword
								label="Mot de passe"
								placeholder="Votre mot de passe..."
								name="password"
								required
								feedbackMessage={passwordErrorMessage}
								onChange={onPasswordChange}
							/>
							<InputFile
								label="Photo"
								placeholder="Choisissez votre photo..."
								name="file"
								feedbackMessage={fileErrorMessage}
								setFeedbackMessage={setFileErrorMessage}
								setFile={setFile}
								onImageSelected={onImageSelected}
							/>
						</div>
						<Button
							type="submit"
							value={"S'inscrire"}
							variant="primary"
							size="full"
							className="text-lg"
						/>
						<div className="m-auto mt-10 w-[75%] text-center">
							<Link
								href="/login"
								type="link"
								value="Déjà un compte ? Connectez-vous !"
							/>
						</div>
					</form>
				</div>
			</ToastProvider>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				onOpenChange={onOpenChange}
				headerTitle="Ajuster votre image"
				buttonActionContent={{
					value: "Valider",
					onClick: async () => {
						const newFile = await onCropDone(croppedArea, image);
						setFile(newFile as File);
						onClose();
						setImage("");
					},
				}}
				hasCancelButton
				bodyContent={
					<ImageCropper
						image={image}
						setCroppedArea={setCroppedArea}
					/>
				}
			/>
		</>
	);
};
