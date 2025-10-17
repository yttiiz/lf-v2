import { cn } from "@heroui/react";

export const H2 = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<h2 className={cn("font-medium text-3xl/10 text-primary", className)}>
			{children}
		</h2>
	);
};
