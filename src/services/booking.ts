import { Mongo } from "@db";
import type {
	BookAProductType,
	BookingDateType,
	BookingsProductSchemaType,
	BookingsProductSchemaWithIDType,
	BookingsType,
	ProductSchemaType,
	ReviewsProductSchemaType,
	ReviewsType,
} from "@types";
import { BookingHandler, getGMT } from "@utils";
import { DateFormatter, Fetcher } from "@yttiiz/utils";
import { ObjectId } from "mongodb";

export const getUserBookingsService = async (id: string | undefined) => {
	const db = import.meta.env.DATABASE_NAME;

	try {
		const bookingsCollection =
			await Mongo.getDocumentsFrom<BookingsProductSchemaType>({
				db,
				collection: "bookings",
			});

		const data: (BookingDateType & {
			bookingId: string;
			productId: string;
			product?: Omit<ProductSchemaType, "reviewId" | "bookingId">;
			reviews?: ReviewsType[];
		})[] = [];

		// Check first for user booking...
		for (const bookings of bookingsCollection) {
			for (const booking of bookings["bookings"]) {
				if (booking.userId === id) {
					data.push({
						endingDate: booking.endingDate,
						startingDate: booking.startingDate,
						createdAt: booking.createdAt,
						productId: bookings.productId,
						bookingId: bookings._id.toString(),
					});
				}
			}
		}

		if (data.length === 0) {
			return {
				ok: true,
				message: "Vous n'avez encore effectuée aucune réservation !",
			};
		}

		// ...then get products & reviews.
		const products = await Mongo.getDocumentsFrom<ProductSchemaType>({
			db,
			collection: "products",
		});

		const reviews = await Mongo.getDocumentsFrom<ReviewsProductSchemaType>({
			db,
			collection: "reviews",
		});

		let index = 0;

		for (const datum of data) {
			const productsAccurate = products.filter(
				(product) => product._id.toString() === data[index].productId,
			);

			for (const productAccurate of productsAccurate) {
				datum["product"] = {
					name: productAccurate.name,
					thumbnail: productAccurate.thumbnail,
					description: productAccurate.description,
					details: productAccurate.details,
					pictures: productAccurate.pictures,
				};

				for (const review of reviews) {
					if (review._id.toString() === productAccurate.reviewId) {
						datum["reviews"] = review.reviews;
					}
				}
			}

			index++;
		}

		return { ok: true, data };
	} catch (error: any) {
		return { ok: false, message: error.message };
	}
};

export const postBookingService = async ({
	id,
	product: { name: productName, type: productType, price: productPrice },
	user: { id: userId, name: userName, email: userEmail },
	startingDate,
	endingDate,
}: BookAProductType) => {
	const db = import.meta.env.DATABASE_NAME;
	const newBooking = {
		userId,
		userName,
		startingDate,
		endingDate,
		createdAt: Date.now(),
	};

	const setDate = (date: string) =>
		DateFormatter.display({
			date: new Date(date).getTime() + getGMT(),
			style: "short",
		});

	try {
		const currentProductBookings =
			await Mongo.getDocumentFrom<BookingsProductSchemaWithIDType>({
				db,
				collection: "bookings",
				identifier: new ObjectId(id),
				key: "_id",
			});

		if (!currentProductBookings) {
			return {
				ok: false,
				message: `Réservation impossible. Veuillez recommencer ultérieurement ou nous contacter à l'adresse <b>${
					import.meta.env.EMAIL_ADDRESS
				}</b> !`,
				status: 200,
			};
		}

		const currentProductBookingsAvailability = BookingHandler.compareBookings(
			newBooking,
			currentProductBookings,
		);

		if (!currentProductBookingsAvailability.isAvailable) {
			const { booking: nextBooking } = currentProductBookingsAvailability;

			return {
				ok: false,
				message: `Le logement est occupé du <b>${setDate(
					nextBooking.startingDate,
				)}</b> au <b>${setDate(
					nextBooking.endingDate,
				)}</b>. Choisissez un autre créneau.`,
				status: 200,
			};
		}

		const { acknowledged } = await Mongo.putDocumentArrayKeyTo({
			db,
			collection: "bookings",
			identifier: newBooking,
			key: "bookings",
			id: new ObjectId(id),
		});

		if (!acknowledged) {
			return {
				ok: false,
				message: `Réservation non effectuée et email non envoyé. Veuillez nous contacter à l'adresse <b>${
					import.meta.env.EMAIL_ADDRESS
				}</b>.`,
				status: 200,
			};
		}

		const numberOfDays = BookingHandler.getDaysNumber(startingDate, endingDate);

		const dates = {
			starting: DateFormatter.display({
				date: new Date(startingDate).getTime() + getGMT(),
				style: "normal",
			}),
			ending: DateFormatter.display({
				date: new Date(endingDate).getTime() + getGMT(),
				style: "normal",
			}),
		};
		const apartment = {
			type: productType,
			name: productName,
		};

		const { MAILER_API_KEY, MAILER_BOOKING_URL } = import.meta.env;

		const res = await Fetcher.postData(
			`${MAILER_BOOKING_URL}?apiKey=${MAILER_API_KEY}`,
			JSON.stringify({
				email: userEmail,
				fullname: userName,
				firstname: userName.split(" ")[0],
				dates,
				apartment,
				price: productPrice,
				numberOfDays,
			}),
		);

		const message = `Votre réservation du <b>${setDate(
			startingDate,
		)}</b> au <b>${setDate(endingDate)}</b> a bien été enregistrée.`;

		return res.ok
			? {
					ok: acknowledged,
					message:
						message +
						` Un e-mail de confirmation a été envoyé à l'adresse <b>${userEmail}</b>.`,
					status: 200,
				}
			: {
					ok: acknowledged,
					message:
						message +
						` Par contre, aucun email n'a été envoyé. Veuillez nous contacter à l'adresse <b>${
							import.meta.env.EMAIL_ADDRESS
						}</b> afin de recevoir votre réservation.`,
					status: 200,
				};
	} catch (error: any) {
		return {
			ok: false,
			message: `Erreur serveur : ${error.message}`,
			status: 500,
		};
	}
};

export const deleteBookingService = async (id: string, data: BookingsType) => {
	const db = import.meta.env.DATABASE_NAME;

	const { acknowledged } = await Mongo.deleteDocumentArrayTo({
		db,
		collection: "bookings",
		id: new ObjectId(id),
		identifier: data,
		key: "bookings",
	});

	return acknowledged
		? { ok: true, message: "Votre réservation a bien été annulée" }
		: {
				ok: false,
				message:
					"Votre réservation n'a pas pu être annulée. Veuillez réessayer ultérieurement.",
			};
};
