import { cn } from "@heroui/react";

export const InputFileButton = ({
	onClick,
	icon,
	className,
}: {
	className: string;
	onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
	icon: React.ReactNode;
}) => {
	return (
		<button
			type="button"
			className={cn(className, "cursor-pointer")}
			onClick={onClick}
		>
			{icon}
		</button>
	);
};
