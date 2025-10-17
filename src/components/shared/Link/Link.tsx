/** biome-ignore-all lint/nursery/useSortedClasses: not needed in this file */
import type { LinkPropsType } from "@types";

export const Link = (
	{
		value,
		variant = "primary",
		type,
		size = "max-content",
		href,
		target = "_self",
		startContent,
		endContent,
	}: LinkPropsType,
	key?: string | number,
) => {
	const colorsForButtonStyle = {
		primary: "bg-primary text-white",
		secondary: "bg-secondary text-primary",
		terciary: "bg-terciary text-white",
		white: "bg-white text-[#029cde]",
		danger: "bg-danger text-white",
		"white-bordered":
			"bg-white text-grey-dark border border-grey-dark hover:bg-grey-dark/10",
		black: "bg-black text-white",
	};
	const colorsForLinkStyle = {
		primary: "text-primary",
		secondary: "text-secondary",
		terciary: "text-terciary",
		white: "text-white",
		danger: "text-danger",
		"white-bordered": "text-white",
		black: "text-black",
	};

	const linkVariant =
		type === "link"
			? colorsForLinkStyle[variant]
			: colorsForButtonStyle[variant];

	return (
		<a
			key={key}
			href={href}
			target={target}
			className={`${linkVariant}${
				type === "button"
					? ` flex items-center gap-2 rounded-full px-4 py-2 hover:opacity-90${
							size && size === "full" ? " w-full" : " w-max px-4"
						}`
					: " flex transition-all duration-300 hover:underline"
			}`}
		>
			{type === "button" ? startContent : null}
			{value}
			{type === "button" ? endContent : null}
		</a>
	);
};
