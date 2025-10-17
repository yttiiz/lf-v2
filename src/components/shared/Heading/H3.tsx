import { cn } from "@heroui/react";

export const H3 = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<h3 className={cn("text-primary text-xl/6", className)}>{children}</h3>
	);
};
