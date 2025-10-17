import type { ContactMessageType } from "@types";
import { Fetcher } from "@yttiiz/utils";

export const postContactMessageService = async ({
	firstName,
	lastName,
	email,
	message,
}: ContactMessageType) => {
	const { MAILER_API_KEY, MAILER_CONTACT_URL } = import.meta.env;

	const res = await Fetcher.postData(
		`${MAILER_CONTACT_URL}?apiKey=${MAILER_API_KEY}`,
		JSON.stringify({
			firstname: firstName,
			lastname: lastName,
			email,
			message,
		}),
	);

	return res.ok
		? { ok: true, message: "Votre message a bien été envoyé !" }
		: {
				ok: false,
				message:
					"Votre message n'a pas pu être envoyé. Veuillez réessayer ultérieurement !",
			};
};
