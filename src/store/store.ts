import type { UserType } from "@types";
import { atom } from "nanostores";

// User
export const isUserConnected = atom(false);
export const user = atom<UserType>(null);

// Booking
export const currentBookingId = atom("");

// Review
export const currentReviewId = atom("");

// Product
export const currentProduct = atom<{
	id: string;
	type: string;
	name: string;
	price: number;
} | null>(null);
