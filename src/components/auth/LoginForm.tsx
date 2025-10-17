import { navigate } from "astro:transitions/client";
import { useAuth } from "@better-auth";
import { useResetPassword } from "@components/auth/hook";
import { ButtonForgotPassword } from "@components/shared/Button/ButtonForgotPassword";
import { Modal } from "@components/shared/Modal/Modal";
import { ToastProvider } from "@components/shared/ToastProvider/ToastProvider";
import { useDisclosure } from "@heroui/react";
import { errorToast, successToast } from "@utils";
import { useState } from "react";
import { Button } from "../shared/Button/Button";
import { Input } from "../shared/Input/Input";
import { InputPassword } from "../shared/Input/InputPassword";
import { Link } from "../shared/Link/Link";

export const LoginForm = () => {
	const [emailErrorMessage, setEmailErrorMessage] = useState("");
	const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

	const { handleSignIn, validateEmail, validatePassword } = useAuth();

	const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.currentTarget.value ? setEmailErrorMessage("") : null;
	};
	const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.currentTarget.value ? setPasswordErrorMessage("") : null;
	};

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Reset error messages
		setEmailErrorMessage("");
		setPasswordErrorMessage("");

		const formData = new FormData(event.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		// Client-side validation
		const emailError = validateEmail(email);
		const passwordError = validatePassword(password);

		if (emailError) {
			setEmailErrorMessage(emailError);
			return;
		}

		if (passwordError) {
			setPasswordErrorMessage(passwordError);
			return;
		}

		// Attempt sign in
		const result = await handleSignIn(email, password);

		if (result.success) {
			navigate("/");
		} else if (result.error) {
			// Show error
			errorToast({
				title: "Erreur",
				description: result.error.message,
			});
		}
	};

	// Reset password modal
	const mutation = useResetPassword();
	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

	const [resetPasswordErrorMessage, setResetPasswordErrorMessage] =
		useState("");

	const onResetPasswordChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		event.currentTarget.value ? setResetPasswordErrorMessage("") : null;
	};

	const onResetPasswordSubmit = async (
		event: React.FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const email = formData.get("email") as string;

		mutation.mutate(email, {
			onSuccess: (data) => {
				onClose();
				data.ok
					? successToast({
							title: "Mot de passe réinitialisé",
							description: data.message,
						})
					: errorToast({ title: "Erreur", description: data.message });
			},
			onError: (data) =>
				errorToast({ title: "Erreur", description: data.message }),
		});
	};

	return (
		<ToastProvider>
			<div
				id="login-form"
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
							forgotPassword={<ButtonForgotPassword onOpen={onOpen} />}
						/>
					</div>
					<Button
						type="submit"
						value={"Envoyer"}
						variant="primary"
						size="full"
						className="text-lg"
					/>
					<div className="m-auto mt-10 w-[75%] text-center">
						<Link
							href="/register"
							type="link"
							value="Pas encore de compte ? Inscrivez-vous !"
						/>
					</div>
				</form>
				<Modal
					isOpen={isOpen}
					onClose={onClose}
					onOpenChange={onOpenChange}
					headerTitle="Mot de passe oublié ?"
					bodyContent={
						<div className="grid gap-4">
							<p>
								Saisissez votre adresse e-mail et nous vous enverrons des
								instructions pour réinitialiser votre mot de passe.
							</p>
							<form
								onSubmit={onResetPasswordSubmit}
								className="mb-8 flex flex-col gap-4"
							>
								<Input
									label="Email"
									placeholder="Votre email..."
									name="email"
									type="email"
									required
									startContent="email"
									feedbackMessage={resetPasswordErrorMessage}
									onChange={onResetPasswordChange}
								/>
								<Button
									type="submit"
									value={"Envoyer"}
									variant="primary"
									size="full"
									className="text-lg"
								/>
							</form>
						</div>
					}
				/>
			</div>
		</ToastProvider>
	);
};
