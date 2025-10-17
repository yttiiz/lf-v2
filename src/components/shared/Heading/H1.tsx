import { cn } from "@heroui/react";

export const H1 = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<h1 className={cn("font-medium text-4xl/10 text-primary", className)}>
			{children}
		</h1>
	);
};
