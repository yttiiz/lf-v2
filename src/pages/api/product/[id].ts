import { getProductService } from "@services";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
	const { id } = params;
	const data = await getProductService(id);

	return new Response(JSON.stringify(data));
};
