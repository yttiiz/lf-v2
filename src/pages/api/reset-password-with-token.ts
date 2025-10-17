import { useAuth } from "@better-auth";
import { resetPasswordWithTokenService } from "@services";
import { isEmpty } from "@utils";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
	const { validatePassword } = useAuth();

	try {
		const { token, newPassword } = (await request.json()) as {
			token: string;
			newPassword: string;
		};

		// Validate required fields
		if (isEmpty(token) || isEmpty(newPassword)) {
			return new Response(
				JSON.stringify({
					ok: false,
					message: "Le token et le nouveau mot de passe sont requis.",
				}),
				{
					status: 400,
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
		}

		// Validate password length (minimum 8 characters)
		if (validatePassword(newPassword, 8)) {
			return new Response(
				JSON.stringify({
					ok: false,
					message: "Le mot de passe doit contenir au moins 8 caractères.",
				}),
				{
					status: 400,
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
		}

		const result = await resetPasswordWithTokenService(token, newPassword);

		return new Response(JSON.stringify(result), {
			status: result.ok ? 200 : 400,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error in reset-password-with-token endpoint:", error);

		return new Response(
			JSON.stringify({
				ok: false,
				message:
					"Une erreur interne s'est produite. Veuillez réessayer ultérieurement.",
			}),
			{
				status: 500,
				statusText:
					"Une erreur interne s'est produite. Veuillez réessayer ultérieurement.",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	}
};
