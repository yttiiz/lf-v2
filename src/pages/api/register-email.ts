import { validatePostRegisterEmail } from "@utils";
import type { APIRoute } from "astro";
import { postSendRegisterEmailService } from "src/services/register-email";

export const POST: APIRoute = async ({ request }) => {
	const userRegisterData = (await request.json()) as {
		email: string;
		firstname: string;
	};
	const userRegisterDataVerification = validatePostRegisterEmail();

	const { data, error } =
		userRegisterDataVerification.safeParse(userRegisterData);

	if (data) {
		const ok = await postSendRegisterEmailService(userRegisterData);
		return new Response(JSON.stringify(ok));
	}

	if (error) {
		return new Response(
			JSON.stringify({
				ok: false,
				message: "Veuillez respecter les champs du formulaire",
			}),
			{ status: 403 },
		);
	}

	return new Response(
		JSON.stringify({
			ok: false,
			message:
				"Quelque chose c'est mal passé. Veuillez recommencer ultérieurement !",
		}),
	);
};
