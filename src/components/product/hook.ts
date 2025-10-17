import {
	getProduct,
	getReview,
	postBookAProduct,
	postReviewToProduct,
} from "@sdk";
import { useMutation, useQuery } from "@tanstack/react-query";
import type {
	AddReviewToProductType,
	BookAProductType,
	BookingsType,
} from "@types";
import { queryClient } from "tanstack-store";

// Query
export const useGetProduct = (id: string) => {
	const query = useQuery(
		{
			queryKey: ["product"],
			queryFn: () => getProduct(id),
		},
		queryClient,
	);

	return query;
};

export const useGetReview = (id: string) => {
	const query = useQuery(
		{
			queryKey: ["review"],
			queryFn: () => getReview(id),
		},
		queryClient,
	);

	return query;
};

export const useBookAProduct = () => {
	const mutation = useMutation(
		{
			mutationFn: async ({
				id,
				user,
				product,
				startingDate,
				endingDate,
			}: BookAProductType) =>
				await postBookAProduct({
					id,
					user,
					product,
					startingDate,
					endingDate,
				}),
		},
		queryClient,
	);

	return mutation;
};

export const useAddReviewToProduct = () => {
	const mutation = useMutation(
		{
			mutationFn: async ({
				id,
				userId,
				userName,
				reviewId,
				review,
				rate,
			}: AddReviewToProductType) =>
				await postReviewToProduct({
					id,
					userId,
					userName,
					reviewId,
					review,
					rate,
				}),
		},
		queryClient,
	);

	return mutation;
};

// Validator
export const useValidator = () => {
	const validateInputDate = (value: string) => {
		if (!value) return "Veuillez renseigner ce champ.";

		const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
		if (!dateRegex.test(value)) return "Veuillez renseigner une date valide.";
		return null;
	};

	const validateReview = (value: string) => {
		const dateRegex =
			/^[0-9a-zA-ZàâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ\s.,:;!?\-()'"]+$/;
		if (!dateRegex.test(value))
			return "Veuillez renseigner un avis sans caractères spéciaux.";
		return null;
	};

	const validateRate = (value: string) => {
		const dateRegex = /^[1-5]$/;
		if (!dateRegex.test(value))
			return "Veuillez renseigner une note valide entre 1 et 5.";
		return null;
	};

	const getProductAvailability = (bookings: BookingsType[]) => {
		const isNoBookings = bookings.length === 0;
		const isThereBookingNow = bookings.filter(
			(booking) =>
				new Date(booking.startingDate).getTime() < Date.now() &&
				new Date(booking.endingDate).getTime() > Date.now(),
		);

		let lastDayBeforeAvailability = "";

		if (isThereBookingNow.length) {
			lastDayBeforeAvailability = isThereBookingNow[0].endingDate;
		}

		const isAvailable = isNoBookings || isThereBookingNow.length === 0;

		return isAvailable
			? {
					isAvailable,
				}
			: {
					isAvailable,
					lastDayBeforeAvailability,
				};
	};

	return {
		validateInputDate,
		validateReview,
		validateRate,
		getProductAvailability,
	};
};

// Handler
export const useHandler = () => {
	const handleInputs = (container: HTMLDivElement) => {
		for (const input of container.querySelectorAll("input")) {
			input.addEventListener("click", (event) => {
				const currentSpan = (event.currentTarget as HTMLInputElement)
					.previousElementSibling;
				const currentLabel = currentSpan?.closest("label");

				if (!currentLabel?.classList.contains("selected")) {
					currentLabel?.classList.add("selected");
				}

				for (const label of container.querySelectorAll("label")) {
					const searchSpan = label.querySelector("span");
					const isNotSelectedAnyMore =
						label.classList.contains("selected") &&
						currentSpan?.textContent !== searchSpan?.textContent;

					if (isNotSelectedAnyMore) {
						label.classList.remove("selected");
					}
				}
			});
		}
	};

	return {
		handleInputs,
	};
};
