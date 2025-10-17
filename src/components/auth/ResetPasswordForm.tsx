import { navigate } from "astro:transitions/client";
import { Button } from "@components/shared/Button/Button";
import { InputPassword } from "@components/shared/Input/InputPassword";
import { Link } from "@components/shared/Link/Link";
import { getUrl, isEmpty } from "@utils";
import { Fetcher } from "@yttiiz/utils";
import { useState } from "react";
import { useValidator } from "./hook";

export const ResetPasswordForm = ({ token }: { token: string | null }) => {
	const { validatePasswordMatch, validatePasswordLength } = useValidator();

	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
	const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
		useState("");

	const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.currentTarget.value ? setPasswordErrorMessage("") : null;
	};
	const onConfirmPasswordChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		event.currentTarget.value ? setConfirmPasswordErrorMessage("") : null;
	};

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const password = formData.get("password")?.toString();
		const confirmPassword = formData.get("confirm-password")?.toString();

		const passwordError = isEmpty(password);
		const confirmPasswordError = isEmpty(confirmPassword);

		// Validation steps
		if (passwordError) return setPasswordErrorMessage(passwordError);
		if (confirmPasswordError)
			return setConfirmPasswordErrorMessage(confirmPasswordError);

		const passwordLengthError = validatePasswordLength(password);

		if (passwordLengthError)
			return setPasswordErrorMessage(passwordLengthError);

		const passwordMatchError = validatePasswordMatch(password, confirmPassword);
		if (passwordMatchError)
			return setConfirmPasswordErrorMessage(passwordMatchError);

		try {
			// Fetching
			const res = await Fetcher.postData<{ message: string }>(
				getUrl("/api/reset-password-with-token"),
				JSON.stringify({
					token,
					newPassword: password,
				}),
			);

			if (res.ok) {
				setSuccessMessage(res.data.message);

				setTimeout(() => {
					navigate("/login");
				}, 2000);
			} else setErrorMessage(res.message);
		} catch (_error) {
			setErrorMessage(
				"Une erreur inattendue s'est produite. Veuillez réessayer.",
			);
		}
	};

	return (
		<form
			onSubmit={onSubmit}
			className="m-auto rounded-2xl border border-grey-dark/30 px-8 py-10 shadow md:w-[400px]"
		>
			<div className="mb-8 flex flex-col gap-6">
				<div>
					<InputPassword
						label="Nouveau mot de passe"
						placeholder="Au moins 8 caractères"
						name="password"
						feedbackMessage={passwordErrorMessage}
						onChange={onPasswordChange}
					/>
					<span className="text-grey-dark text-xs">
						Votre nouveau mot de passe doit comporter au moins 8 caractères.
					</span>
				</div>
				<InputPassword
					label="Confirmer le mot de passe"
					placeholder="Confirmez votre mot de passe..."
					name="confirm-password"
					feedbackMessage={confirmPasswordErrorMessage}
					onChange={onConfirmPasswordChange}
				/>
				{successMessage ? (
					<div className="bg-success/5 p-2 text-success">{successMessage}</div>
				) : null}
				{errorMessage ? (
					<div className="bg-danger/5 p-2 text-danger">{errorMessage}</div>
				) : null}
			</div>
			<Button
				type="submit"
				value={"Réinitialiser le mot de passe"}
				variant="primary"
				size="full"
				className="text-lg"
			/>
			<div className="flex justify-center pt-10">
				<Link
					value="Retour à la page de connexion"
					href="/login"
					type="link"
				/>
			</div>
		</form>
	);
};
