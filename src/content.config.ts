import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

const home = defineCollection({
	loader: file("src/data/home/home.json"),
	schema: z.object({
		hero: z.object({
			title: z.string(),
			paragraph: z.string(),
			imgAlt: z.string(),
			button: z.object({
				textContent: z.string(),
				href: z.string(),
			}),
		}),
		apartments: z.object({
			title: z.string(),
			paragraph: z.string(),
		}),
		visits: z.object({
			title: z.string(),
			items: z.array(
				z.object({
					title: z.string(),
					paragraph: z.string(),
					location: z.string(),
					href: z.string(),
					image: z.object({
						src: z.string(),
						alt: z.string(),
						author: z.string(),
					}),
				}),
			),
		}),
	}),
});

export const collections = { home };
