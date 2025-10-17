import { getReviewService, postReviewToProductService } from "@services";
import type { AddReviewToProductType } from "@types";
import { validateAddReviewToProduct } from "@utils";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
	const id = new URLSearchParams(request.url).values().next().value;
	let data = {};

	if (id) {
		data = { ...(await getReviewService(id)) };
	}

	return new Response(JSON.stringify(data));
};

export const POST: APIRoute = async ({ request }) => {
	const review = (await request.json()) as AddReviewToProductType;
	const reviewVerification = validateAddReviewToProduct();

	const { data: reviewValidated, error } = reviewVerification.safeParse(review);

	if (reviewValidated) {
		const data = await postReviewToProductService(review);

		return new Response(JSON.stringify(data), { status: data.status });
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
