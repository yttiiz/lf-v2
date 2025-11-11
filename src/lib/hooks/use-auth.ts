import { signIn, signOut, signUp } from "@better-auth";
import { postSendRegisterEmail } from "@sdk";
import type { AuthResult, UserRegistrationType } from "@types";

export const useAuth = () => {
	const handleSignIn = async (
		email: string,
		password: string,
	): Promise<AuthResult> => {
		try {
			const { data } = await signIn.email({
				email,
				password,
			});

			if (data) {
				return { success: true };
			}

			return {
				success: false,
				error: { message: "Email ou mot de passe incorrect" },
			};
		} catch (_err: any) {
			return {
				success: false,
				error: { message: "Une erreur est survenue lors de la connexion" },
			};
		}
	};

	const handleSignUp = async ({
		firstName,
		lastName,
		email,
		password,
		image,
	}: UserRegistrationType): Promise<AuthResult> => {
		try {
			const { data, error } = await signUp.email({
				name: `${firstName} ${lastName}`,
				email,
				password,
				image,
			});

			if (data) {
				await postSendRegisterEmail(email, firstName);
				return { success: true, user: data.user };
			}

			if (error && error.message?.includes("already exists")) {
				return {
					success: false,
					error: { message: "Un compte avec cette adresse email existe déjà" },
				};
			}

			return {
				success: false,
				error: { message: "Erreur lors de la création du compte" },
			};
		} catch (_err: any) {
			return {
				success: false,
				error: { message: "Erreur interne du serveur" },
			};
		}
	};

	const handleSignOut = async (): Promise<void> => {
		try {
			await signOut();
			globalThis.location.reload();
		} catch (err: any) {
			console.error("Sign out error:", err);
		}
	};

	const validateEmail = (email: string): string | null => {
		if (!email) return "Veuillez renseigner ce champ.";
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email))
			return "Veuillez renseigner une adresse email valide.";
		return null;
	};

	const validatePassword = (password: string): string | null => {
		const size = +import.meta.env.PUBLIC_MIN_PASSWORD_LENGTH;
		if (!password) return "Veuillez renseigner ce champ.";
		if (password.length < size) return "Votre mot de passe est trop court.";
		return null;
	};

	const validateName = (name: string): string | null => {
		if (!name) return "Veuillez renseigner ce champ.";
		if (name.length < 2) return "Le nom doit contenir au moins 2 caractères.";
		return null;
	};

	const validateFile = (file: File | null) => {
		if (!file) return null;

		const acceptedFormat = ["jpeg", "jpg", "png", "webp"];
		const fileExtension = file.type.split("/").at(1) as string;

		if (file.size === 0) return null;
		if (!acceptedFormat.includes(fileExtension))
			return "Veuillez sélectionner un fichier avec l'un des formats suivants: (.jpeg, .jpg, .png, .webp)";
		if (file.size > 500_000)
			return "Veuillez selectionner un fichier inférieur ou égal à 500 Ko.";
		return null;
	};

	return {
		handleSignIn,
		handleSignUp,
		handleSignOut,
		validateEmail,
		validatePassword,
		validateName,
		validateFile,
	};
};
