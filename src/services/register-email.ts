import { Fetcher } from "@yttiiz/utils";

export const postSendRegisterEmailService = async ({
	firstname,
	email,
}: {
	firstname: string;
	email: string;
}) => {
	const { MAILER_API_KEY, MAILER_REGISTER_URL } = import.meta.env;

	const res = await Fetcher.postData(
		`${MAILER_REGISTER_URL}?apiKey=${MAILER_API_KEY}`,
		JSON.stringify({
			firstname,
			email,
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
