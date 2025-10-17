// @ts-check
import react from "@astrojs/react";
import deno from "@deno/astro-adapter";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
	integrations: [react()],
	output: "server",
	adapter: deno(),
	vite: {
		// @ts-expect-error - Tailwind CSS v4 Vite plugin types
		plugins: [tailwindcss()]
	},
});
