const isSlugIncludeIds = (slug: string) => {
	return ["#products", "#visits"].filter((id) => slug.includes(id)).length > 0;
};

export const isHomePageUrl = (url: string) => {
	const slug = url.split("/")[3];
	return slug.length < 1 || isSlugIncludeIds(slug);
};

export const getUrl = (url: string) => {
	// Ensure relative URLs start with a forward slash
	const normalizedUrl =
		url.startsWith("/") || url.startsWith("http") ? url : `/${url}`;
	return new URL(normalizedUrl, import.meta.env.PUBLIC_APP_URL).href;
};
