import type { PressEvent } from "@heroui/react";
import type { ItemsSubmenuType, ItemType } from "@types";

export type VariantColorType =
	| "primary"
	| "secondary"
	| "terciary"
	| "white"
	| "danger"
	| "white-bordered"
	| "black";
export type ButtonSizeType = "max-content" | "full";
export type IconMenuItemType = "star" | "house" | "booking" | "mail";

export type InputCommonType = {
	label?: string;
	name: string;
	value?: string;
	required?: boolean;
	disabled?: boolean;
	placeholder?: string;
	variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
	maxLength?: number;
	minLength?: number;
	feedbackMessage?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
};

export type InputPropsType = InputCommonType & {
	type?: React.HTMLInputTypeAttribute | undefined;
	min?: string | number;
	max?: string | number;
	startContent?: React.ReactNode;
	endContent?: React.ReactNode;
};

export type TextAreaPropsType = InputCommonType & {
	minRows?: number;
	maxRows?: number;
};

export type ButtonPropsType = {
	value?: string;
	type?: "button" | "submit" | "reset";
	size?: "max-content" | "full";
	className?: string;
	startContent?: React.ReactNode;
	endContent?: React.ReactNode;
	variant?: VariantColorType;
	isIconOnly?: boolean;
	onClick?: (event: PressEvent) => void;
	disabled?: boolean;
};

export type ItemLinkPropsType = Partial<
	Pick<ItemType, "href" | "icon" | "textContent">
> & {
	itemClassName: string;
};

export type ItemSubmenuPropsType = {
	isApartementListHidden: boolean | null;
	items?: ItemsSubmenuType[];
	classNames: {
		itemContainerClassName: string;
		itemClassName: string;
	};
	ref: React.Ref<HTMLUListElement> | undefined;
};

export type LinkPropsType = {
	value: string | React.ReactNode;
	variant?: VariantColorType;
	size?: "max-content" | "full";
	href: string;
	target?: React.HTMLAttributeAnchorTarget | undefined;
	type: "button" | "link";
	startContent?: React.ReactNode;
	endContent?: React.ReactNode;
};

export type IconGenerateType = {
	icon: IconStyleType;
};

export type IconStyleType =
	| "user"
	| "lock"
	| "email"
	| "eye-slash"
	| "eye"
	| "euro"
	| "booking"
	| "clean"
	| "photo";

export type ModalPropsType = {
	isOpen: boolean;
	size?:
		| "xs"
		| "sm"
		| "md"
		| "lg"
		| "xl"
		| "2xl"
		| "3xl"
		| "4xl"
		| "5xl"
		| "full";
	headerTitle: string;
	bodyContent: React.ReactNode;
	hasCancelButton?: boolean;
	buttonActionContent?: {
		value: string;
		variant?: VariantColorType;
		onClick: () => void;
	};
	className?: string;
	onClose?: () => void;
	onOpenChange?: (isOpen: boolean) => void;
};

// Session
export type SessionType = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	expiresAt: Date;
	token: string;
	ipAddress?: string | null | undefined;
	userAgent?: string | null | undefined;
} | null;

export type UserType = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	email: string;
	emailVerified: boolean;
	name: string;
	image?: string | null | undefined;
} | null;

export type UserSafeType = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	email: string;
	emailVerified: boolean;
	name: string;
	image?: string | null | undefined;
};
