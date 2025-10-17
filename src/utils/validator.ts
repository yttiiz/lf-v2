import { z } from "astro:schema";

export const validateBookAProduct = () => {
	return z.object({
		id: z.string(),
		user: z.object({
			id: z.string(),
			name: z.string(),
			email: z.string().email(),
		}),
		product: z.object({
			type: z.string(),
			name: z.string(),
			price: z.number(),
		}),
		startingDate: z.string(),
		endingDate: z.string(),
	});
};

export const validateDeleteBooking = () => {
	return z.object({
		id: z.string(),
		data: z.object({
			userId: z.string(),
			userName: z.string(),
			startingDate: z.string(),
			endingDate: z.string(),
			createdAt: z.number(),
		}),
	});
};

export const validateContactMessage = () => {
	return z.object({
		firstName: z.string(),
		lastName: z.string(),
		email: z.string(),
		message: z.string(),
	});
};

export const validateAddReviewToProduct = () => {
	return z.object({
		id: z.string(),
		userId: z.string(),
		userName: z.string(),
		reviewId: z.string(),
		review: z.string(),
		rate: z.string(),
	});
};

export const validatePostRegisterEmail = () => {
	return z.object({
		firstname: z.string(),
		email: z.string(),
	});
};

export const isEmpty = (value: string | undefined) =>
	value ? null : "Veuillez renseignez ce champ";
