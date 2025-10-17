export const handleHeader = () => {
	const heroBanner = document.querySelector(".hero-banner");
	const header = document.querySelector("header[data-header]");

	if (heroBanner && header) {
		const observer = new IntersectionObserver(
			(entries) => {
				const [section] = entries;

				header.classList.toggle("with-bg", !section.isIntersecting);
			},
			{
				root: globalThis.document,
				rootMargin: "0px",
				threshold: 0.1,
			},
		);

		observer.observe(heroBanner);
	}
};
