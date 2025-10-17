import { getProductsService } from "@services";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
	const params = request.url.split("?")[1];
	const data = await getProductsService(params);

	return new Response(JSON.stringify(data));
};
