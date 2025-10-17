/// <reference path="../.astro/types.d.ts" />

declare namespace App {
	interface Locals {
		user: import("better-auth").User | null;
		session: import("better-auth").Session | null;
	}
}

interface ImportMetaEnv {
	readonly APP_ENV: string;
	readonly PORT: number;
	readonly HOST: string;
	readonly PUBLIC_APP_URL: string;
	readonly APP_SESSION_NAME: string;
	readonly IMAGE_UPLOADER_API_KEY: string;
	readonly IMAGE_UPLOADER_URL: string;
	readonly MAILER_API_KEY: string;
	readonly MAILER_REGISTER_URL: string;
	readonly MAILER_BOOKING_URL: string;
	readonly MAILER_CONTACT_URL: string;
	readonly MAILER_FORGOT_PASSWORD_URL: string;
	readonly DATABASE_NAME: string;
	readonly DATABASE_HOST: string;
	readonly DATABASE_USERNAME: string;
	readonly DATABASE_PASSWORD: string;
	readonly EMAIL_ADDRESS: string;
	readonly DOMAIN_AUTHORIZED: string;
	readonly BETTER_AUTH_SECRET: string;
	readonly BETTER_AUTH_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
