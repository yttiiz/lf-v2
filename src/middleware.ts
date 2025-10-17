import { defineMiddleware } from "astro:middleware";
import { auth } from "@better-auth-server";

export const onRequest = defineMiddleware(async (context, next) => {
	const requiredPath = context.url.pathname;
	const authResult = await auth.api.getSession({
		headers: context.request.headers,
	});

	if (authResult?.session) {
		context.locals.user = authResult.user;
		context.locals.session = authResult.session;

		switch (requiredPath) {
			case "/login":
			case "/register": {
				return context.redirect("/");
			}
		}
	} else {
		context.locals.user = null;
		context.locals.session = null;

		const isForbiddenPath =
			requiredPath === "/user-profil" || requiredPath === "/booking";

		if (isForbiddenPath) {
			return context.redirect("/");
		}
	}

	return next();
});
