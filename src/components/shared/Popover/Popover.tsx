import {
	cn,
	PopoverContent,
	Popover as PopoverHeroui,
	PopoverTrigger,
} from "@heroui/react";

export const Popover = ({
	trigger,
	children,
	placement = "bottom",
	isOpen,
	onOpenChange,
	classNames = {
		base: cn("bg-white rounded-lg border border-primary/20"),
	},
}: {
	trigger: React.ReactNode;
	children: React.ReactNode;
	placement?: "top" | "bottom" | "right" | "left";
	isOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	classNames?: {
		base?: string;
		content?: string;
		backdrop?: string;
	};
}) => {
	return (
		<PopoverHeroui
			isOpen={isOpen}
			placement={placement}
			classNames={classNames}
			onOpenChange={onOpenChange}
			offset={25}
			showArrow
		>
			<PopoverTrigger>{trigger}</PopoverTrigger>
			<PopoverContent>{children}</PopoverContent>
		</PopoverHeroui>
	);
};
