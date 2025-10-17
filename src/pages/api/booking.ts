import {
	deleteBookingService,
	getUserBookingsService,
	postBookingService,
} from "@services";
import type { BookAProductType } from "@types";
import { validateBookAProduct, validateDeleteBooking } from "@utils";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
	const id = new URLSearchParams(request.url).values().next().value;
	const data = await getUserBookingsService(id);

	return new Response(JSON.stringify(data));
};

export const POST: APIRoute = async ({ request }) => {
	const bookAProduct = (await request.json()) as BookAProductType;
	const BookAProductVerification = validateBookAProduct();

	const { data, error } = BookAProductVerification.safeParse(bookAProduct);

	if (data) {
		const ok = await postBookingService(bookAProduct);
		return new Response(JSON.stringify(ok), { status: ok.status });
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

export const DELETE: APIRoute = async ({ request }) => {
	const deleteBooking = await request.json();
	const deleteBookingVerification = validateDeleteBooking();

	const { data: dataValidated, error } =
		deleteBookingVerification.safeParse(deleteBooking);

	if (dataValidated) {
		const { id, data } = dataValidated;
		const res = await deleteBookingService(id, data);
		return new Response(JSON.stringify(res));
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
