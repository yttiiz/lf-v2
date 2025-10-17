// @ts-check

import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
	integrations: [react()],
	output: "server",
	adapter: netlify(),
	vite: {
		// @ts-expect-error - Tailwind CSS v4 Vite plugin types
		plugins: [tailwindcss()],
	},
});
