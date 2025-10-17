import { createAuthClient } from "better-auth/react";

export const {
	signIn,
	signUp,
	signOut,
	useSession,
	updateUser,
	changePassword,
	changeEmail,
	deleteUser,
} = createAuthClient({
	baseURL: import.meta.env.BETTER_AUTH_URL,
	fetchOptions: {
		credentials: "include", // This ensures cookies are sent with requests
	},
	cookieOptions: {
		secure: import.meta.env.PROD, // Use secure cookies in production
		sameSite: "lax",
		httpOnly: false, // Client-side auth client needs access to cookies
	},
});
