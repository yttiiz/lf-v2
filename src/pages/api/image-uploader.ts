import { Fetcher } from "@yttiiz/utils";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
	const { IMAGE_UPLOADER_API_KEY, IMAGE_UPLOADER_URL } = import.meta.env;
	const formData = await request.formData();
	const res = await Fetcher.postData<{ message: string; avatarUrl?: string }>(
		`${IMAGE_UPLOADER_URL}?apiKey=${IMAGE_UPLOADER_API_KEY}`,
		formData,
	);

	if (res.ok) {
		const data = res.data;
		return new Response(JSON.stringify({ ok: true, message: data.avatarUrl }));
	}

	const { message } = JSON.parse(res.message);
	return new Response(JSON.stringify({ ok: false, message }));
};
