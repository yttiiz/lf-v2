import { postContactMessageService } from "@services";
import type { ContactMessageType } from "@types";
import { validateContactMessage } from "@utils";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
	const contactMessage = (await request.json()) as ContactMessageType;
	const contactMessageVerification = validateContactMessage();

	const { data, error } = contactMessageVerification.safeParse(contactMessage);

	if (data) {
		const ok = await postContactMessageService(contactMessage);
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
