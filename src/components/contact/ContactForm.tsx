import { useAuth } from "@better-auth";
import { Button } from "@components/shared/Button/Button";
import { Input } from "@components/shared/Input/Input";
import { TextArea } from "@components/shared/TextArea/TextArea";
import { ToastProvider } from "@components/shared/ToastProvider/ToastProvider";
import { errorToast, successToast } from "@utils";
import { useState } from "react";
import { useContactMessage, validateMessage } from "./hook";

export const ContactForm = () => {
	const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
	const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
	const [emailErrorMessage, setEmailErrorMessage] = useState("");
	const [messageErrorMessage, setMessageErrorMessage] = useState("");

	const { validateEmail, validateName } = useAuth();

	const mutation = useContactMessage();

	const onFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.currentTarget.value ? setFirstNameErrorMessage("") : null;
	};

	const onLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.currentTarget.value ? setLastNameErrorMessage("") : null;
	};

	const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.currentTarget.value ? setEmailErrorMessage("") : null;
	};

	const onMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.currentTarget.value ? setMessageErrorMessage("") : null;
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		const firstName = formData.get("firstName") as string;
		const lastName = formData.get("lastName") as string;
		const email = formData.get("email") as string;
		const message = formData.get("message") as string;

		const firstNameError = validateName(firstName);
		const lastNameError = validateName(lastName);
		const emailError = validateEmail(email);
		const messageError = validateMessage(message);

		if (firstNameError) return setFirstNameErrorMessage(firstNameError);
		if (lastNameError) return setLastNameErrorMessage(lastNameError);
		if (emailError) return setEmailErrorMessage(emailError);
		if (messageError) return setMessageErrorMessage(messageError);

		mutation.mutate(
			{
				firstName,
				lastName,
				email,
				message,
			},
			{
				onSuccess: (data) => {
					data.ok
						? successToast({
								title: "Félicitations",
								description: data.message,
							})
						: errorToast({
								title: "Erreur",
								description: data.message,
							});
				},
				onError: (data) => {
					errorToast({
						title: "Erreur",
						description: data.message,
					});
				},
			},
		);
	};

	return (
		<ToastProvider>
			<div className="m-auto w-full rounded-2xl border border-grey-dark/30 bg-white shadow md:w-[400px]">
				<h3 className="border-b border-b-grey-dark/30 p-8 text-center font-medium text-2xl text-primary">
					Ecrivez-nous
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
							onChange={onFirstNameChange}
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
						<TextArea
							label="Message"
							placeholder="Votre message..."
							name="message"
							required
							feedbackMessage={messageErrorMessage}
							onChange={onMessageChange}
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
			</div>
		</ToastProvider>
	);
};
