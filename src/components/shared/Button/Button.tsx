/** biome-ignore-all lint/nursery/useSortedClasses: not needed in this file */
import { Button as ButtonHeroui } from "@heroui/react";
import type { ButtonPropsType } from "@types";

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

export const Button = ({
	value,
	type,
	className,
	size,
	variant = "primary",
	startContent,
	endContent,
	isIconOnly,
	onClick,
	disabled = false,
}: ButtonPropsType) => {
	return (
		<ButtonHeroui
			radius="full"
			type={type}
			className={`${className ? `${className} ` : ""}${
				size && size === "full"
					? "w-full "
					: `w-max ${isIconOnly ? " " : "px-4 "} `
			}${colorsForButtonStyle[variant]} ${
				disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
			}`}
			onPress={disabled ? undefined : onClick}
			startContent={startContent}
			endContent={endContent}
			isIconOnly={isIconOnly}
			isDisabled={disabled}
		>
			{isIconOnly ? null : <span className="leading-1">{value}</span>}
		</ButtonHeroui>
	);
};
