import type { ReviewsProductSchemaWithIDType } from "@types";
import { DateFormatter } from "@yttiiz/utils";

export const formatPrice = (price: number) => {
	return new Intl.NumberFormat("fr-FR", {
		maximumFractionDigits: 2,
		style: "currency",
		currency: "EUR",
	}).format(price);
};

export const normalizeString = (str: string) => {
	return str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
};

export const limitDates = (date?: string | undefined) => {
	if (date) {
		return {
			min: date,
		};
	}

	const { year, month, day } = DateFormatter.create();

	return {
		min: `${year}-${month}-${day}`,
	};
};

export const limitAge = (MAJORITY = 18, CENTURY = 100) => {
	const { year, month, day } = DateFormatter.create();

	return {
		min: `${year - CENTURY}-${month}-${day}`,
		max: `${year - MAJORITY}-${month}-${day}`,
	};
};

export const minAndMaxDateParser = (
	label: string,
	startingDate?: string | undefined,
) => {
	return label.includes("naissance")
		? `min="${limitAge().min}"
					max="${limitAge().max}"`
		: `min="${limitDates(startingDate).min}"`;
};

export const rateAverage = (
	ratesOrReviewsDocument: ReviewsProductSchemaWithIDType | number[],
	rateCount = 0,
) => {
	let rateSummary = 0;
	const reviews =
		"_id" in ratesOrReviewsDocument
			? ratesOrReviewsDocument.reviews
			: ratesOrReviewsDocument;

	for (const review of reviews) {
		rateCount++;
		const rate = typeof review === "number" ? review : review.rate;
		rateSummary += rate;
	}

	return new Intl.NumberFormat("fr-FR", {
		maximumFractionDigits: 1,
		minimumFractionDigits: 1,
	}).format(rateSummary === 0 ? 0 : rateSummary / rateCount);
};

export const getGMT = (offset = 4) => {
	return offset * (1000 * 60 * 60);
};

export const RateProduct = {
	excellent: 5,
	good: 4,
	quiteGood: 3,
	bad: 2,
	execrable: 1,
} as const;
