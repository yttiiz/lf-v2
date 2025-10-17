import { changeEmail, changePassword, updateUser } from "@better-auth";

export const useUpdate = () => {
	const handleUserUpdate = async ({
		image,
		name,
	}: {
		image?: string;
		name: string;
	}) => {
		try {
			const result = await updateUser({
				image,
				name,
			});

			if (result.data) {
				return { success: result.data.status, status: 200 };
			}

			return {
				success: false,
				status: result.error.status,
				message:
					"Votre profil n'a pas été mis à jour ! Veuillez réessayer ultérieurement.",
			};
		} catch (_error) {
			return {
				success: false,
				message:
					"Une erreur est survenue lors de la connexion ! Veuillez réessayer ultérieurement.",
			};
		}
	};

	const handleChangePassword = async ({
		currentPassword,
		newPassword,
	}: {
		currentPassword: string;
		newPassword: string;
	}) => {
		try {
			const result = await changePassword({
				currentPassword,
				newPassword,
			});

			if (result.data) {
				return { success: true, status: 200 };
			}

			return {
				success: false,
				status: result.error.status,
				message:
					"Votre ancien mot de passe n'est pas correct. Veuillez réessayer !",
			};
		} catch (_error) {
			return {
				success: false,
				message:
					"Une erreur est survenue lors de la connexion ! Veuillez réessayer ultérieurement.",
			};
		}
	};

	const handleChangeEmail = async (newEmail: string) => {
		try {
			const result = await changeEmail({
				newEmail,
			});

			if (result.data) {
				return { success: result.data.status, status: 200 };
			}

			return {
				success: false,
				status: result.error.status,
				message: "Votre adresse email n'est pas correct. Veuillez réessayer !",
			};
		} catch (_error) {
			return {
				success: false,
				message:
					"Une erreur est survenue lors de la connexion ! Veuillez réessayer ultérieurement.",
			};
		}
	};

	const validateName = (
		name: string,
		firstNameOrLastName: string,
	): string | null => {
		const startNameLimit = /^[a-zA-Z]?$/;
		const endNameLimit = /^[a-zA-Z]{16,}$/;
		if (name.includes(" ")) name = name.split(" ").join("");

		if (!name) return "Veuillez renseigner ce champ.";
		if (startNameLimit.test(name))
			return `Le ${firstNameOrLastName} doit contenir au moins 2 caractères.`;
		if (endNameLimit.test(name))
			return `Le ${firstNameOrLastName} doit contenir au maximum 15 caractères.`;
		return null;
	};

	return {
		handleUserUpdate,
		handleChangeEmail,
		handleChangePassword,
		validateName,
	};
};
