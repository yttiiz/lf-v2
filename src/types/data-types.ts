import type {
	IconMenuItemType,
	ProductSchemaType,
	ReviewsProductSchemaWithIDType,
} from "@types";

export type LinkType = {
	textContent: string;
	href: string;
};

export type ImageType = {
	src: string;
	alt: string;
};

export type ItemType = {
	textContent: string;
	href?: string;
	isLink: boolean;
	isRelatedToUser: boolean;
	icon: IconMenuItemType;
	itemsSubmenu?: ItemsSubmenuType[];
};

export type ItemLoginType = LinkType & {
	isButton: boolean;
};

export type ItemsSubmenuType = Pick<ItemType, "href" | "textContent">;

export type HomeContentType = {
	hero: HeroContentType;
	apartments: ApartmentsContentType;
	visits: {
		title: string;
		items: VisitCardType[];
	};
};

export type HeroContentType = {
	title: string;
	paragraph: string;
	imgAlt: string;
	button: LinkType;
};

export type ApartmentsContentType = {
	title: string;
	paragraph: string;
};

export type ProductCardContentType = Omit<
	ProductSchemaType,
	"bookingId" | "reviewId"
> & {
	href: string;
	review: ReviewsProductSchemaWithIDType;
};

export type VisitCardType = {
	image: ImageType & { author: string };
	href: string;
	location: string;
	title: string;
	paragraph: string;
};

export type FooterContentType = {
	details: {
		companyName: string;
		address: {
			line: string;
			zip: string;
			city: string;
			country: string;
		};
		phone: string;
	};
	company: {
		title: string;
		items: (LinkType & { className: string })[];
	};
	legalsInformations: {
		title: string;
		items: (LinkType & { className: string })[];
	};
	copyrights: string;
};

export type FormAttributesType = {
	action: string;
	method: string;
};

export type CommonInputType = {
	name?: string;
	required?: string;
	disabled?: string;
	value?: string;
};

export type InputDataType = CommonInputType & {
	type: string;
	label?: string;
	placeholder?: string;
	maxLength?: string;
	minLength?: string;
	accept?: string;
	autocomplete?: string;
	forgotPassword?: boolean;
	items?: string[] | CommonInputType[];
};
