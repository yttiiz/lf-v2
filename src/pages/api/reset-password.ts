import { useAuth } from "@better-auth";
import { postResetPasswordService } from "@services";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
	const { validateEmail } = useAuth();
	const { email } = (await request.json()) as { email: string };
	const errorEmail = validateEmail(email);

	if (errorEmail) {
		return new Response(JSON.stringify({ ok: false, message: errorEmail }));
	}

	const data = await postResetPasswordService(email);

	return new Response(JSON.stringify(data));
};
