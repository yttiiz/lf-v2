import { auth } from "@better-auth-server";

export const postResetPasswordService = async (email: string) => {
	try {
		const result = await auth.api.forgetPassword({
			body: { email },
		});

		if (result) {
			return {
				ok: true,
				message:
					"Si cette adresse email est associée à un compte, un email de réinitialisation de mot de passe vous a été envoyé. Veuillez vérifier votre boîte de réception et suivre les instructions.",
			};
		}

		return {
			ok: false,
			message:
				"Une erreur s'est produite lors de l'envoi de l'email de réinitialisation. Veuillez réessayer ultérieurement.",
		};
	} catch (error) {
		console.error("Error in password reset service:", error);

		return {
			ok: false,
			message:
				"Une erreur s'est produite lors de l'envoi de l'email de réinitialisation. Veuillez réessayer ultérieurement.",
		};
	}
};

// New service for handling password reset with token
export const resetPasswordWithTokenService = async (
	token: string,
	newPassword: string,
) => {
	try {
		const result = await auth.api.resetPassword({
			body: {
				token,
				newPassword,
			},
		});

		if (result) {
			return {
				ok: true,
				message: "Votre mot de passe a été réinitialisé avec succès.",
			};
		}

		return {
			ok: false,
			message: "Le lien de réinitialisation est invalide ou a expiré.",
		};
	} catch (error) {
		console.error("Error resetting password with token:", error);

		return {
			ok: false,
			message:
				"Une erreur s'est produite lors de la réinitialisation du mot de passe.",
		};
	}
};
