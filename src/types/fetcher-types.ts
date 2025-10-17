import type { BookingDateType, ProductSchemaType, ReviewsType } from "@types";

export type BookAProductType = {
	id: string;
	user: {
		id: string;
		name: string;
		email: string;
	};
	product: {
		type: string;
		name: string;
		price: number;
	};
	startingDate: string;
	endingDate: string;
};

export type AddReviewToProductType = {
	id: string;
	userId: string;
	userName: string;
	reviewId: string;
	review: string;
	rate: string;
};

export type ContactMessageType = {
	firstName: string;
	lastName: string;
	email: string;
	message: string;
};

export type UserBookingsType = BookingDateType & {
	bookingId: string;
	productId: string;
	product: Omit<ProductSchemaType, "reviewId" | "bookingId">;
	reviews: ReviewsType[];
};
