import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
	const { IMAGE_UPLOADER_API_KEY, IMAGE_UPLOADER_URL } = import.meta.env;
	const formData = await request.formData();
	const res = await fetch(
		`${IMAGE_UPLOADER_URL}?apiKey=${IMAGE_UPLOADER_API_KEY}`,
		{
			method: "POST",
			body: formData,
		},
	);

	if (res.ok) {
		const data = await res.json();
		return new Response(JSON.stringify({ ok: true, message: data.avatarUrl }));
	}

	return new Response(JSON.stringify({ ok: false, message: res.statusText }));
};
