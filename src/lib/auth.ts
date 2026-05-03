import { Mongo } from "@db";
import { Fetcher } from "@yttiiz/utils";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

type Auth = ReturnType<typeof betterAuth>;

let _auth: Auth | undefined;

function createAuth(): Auth {
	const client = Mongo.client;
	const database = mongodbAdapter(
		Mongo.getDatabase(import.meta.env.DATABASE_NAME),
		{ client },
	);

	return betterAuth({
		database,
		emailAndPassword: {
			enabled: true,
			minPasswordLength: +import.meta.env.PUBLIC_MIN_PASSWORD_LENGTH,
			sendResetPassword: async ({ user, token }) => {
				const firstname = user.name.split(" ")[0];

				const { PUBLIC_APP_URL, MAILER_API_KEY, MAILER_FORGOT_PASSWORD_URL } =
					import.meta.env;

				const resetUrl = `${PUBLIC_APP_URL}/reset-password?token=${token}`;

				await Fetcher.postData(
					`${MAILER_FORGOT_PASSWORD_URL}?apiKey=${MAILER_API_KEY}`,
					JSON.stringify({
						email: user.email,
						firstname,
						url: resetUrl,
						token,
					}),
				);
			},
			resetPasswordTokenExpiresIn: 60 * 60, // 1 hour
		},
		user: {
			changeEmail: {
				enabled: true,
			},
			deleteUser: {
				enabled: true,
			},
		},
		secret: import.meta.env.BETTER_AUTH_SECRET,
		baseURL: import.meta.env.BETTER_AUTH_URL,
		session: {
			expiresIn: 60 * 60 * 24 * 7, // 7 days
			updateAge: 60 * 60 * 24, // 1 day
			cookieCache: {
				enabled: true,
				maxAge: 60 * 5,
			},
		},
		cookies: {
			sessionToken: {
				name: "better-auth.session_token",
				httpOnly: true,
				secure: import.meta.env.APP_ENV === "production",
				sameSite: "lax",
				path: "/",
				maxAge: 60 * 60 * 24 * 7, // 7 days
			},
		},
		trustedOrigins: [import.meta.env.BETTER_AUTH_URL, "http://localhost:4321"],
	});
}

export function getAuth(): Auth {
	if (!_auth) {
		_auth = createAuth();
	}
	return _auth;
}

export const auth = new Proxy({} as Auth, {
	get(_, prop: keyof Auth) {
		return getAuth()[prop];
	},
});
