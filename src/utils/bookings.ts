import type { BookingsProductSchemaWithIDType, BookingsType } from "@types";

type ReturnBookingAvailabilityType =
	| {
			isAvailable: false;
			booking: BookingsType;
	  }
	| {
			isAvailable: true;
	  };

export class BookingHandler {
	public static getProductAvailability(booking?: BookingsType | undefined) {
		if (booking) {
			const today = Date.now();
			const startingDate = new Date(booking.startingDate).getTime();
			const endingDate = new Date(booking.endingDate).getTime();

			return {
				isAvailable: today < startingDate || today > endingDate,
				endingDate,
			};
		}

		return {
			isAvailable: true,
			endingDate: undefined,
		};
	}

	public static getProductPresentOrNextBookings(bookings: BookingsType[]) {
		if (bookings.length > 0) {
			const today = Date.now();
			const presentOrNextBookings = [];

			for (const booking of bookings) {
				if (
					BookingHandler.getTime(booking.startingDate) > today ||
					BookingHandler.getTime(booking.endingDate) >= today
				) {
					presentOrNextBookings.push(booking);
				}
			}

			return presentOrNextBookings;
		}

		return bookings;
	}

	public static compareBookings(
		newBooking: BookingsType,
		bookings: BookingsProductSchemaWithIDType,
	): ReturnBookingAvailabilityType {
		let bool = true;
		let nextBookings = BookingHandler.getProductPresentOrNextBookings(
			bookings.bookings,
		);

		nextBookings = BookingHandler.sortFromClosestToOlderBookings(nextBookings);

		for (const booking of nextBookings) {
			const isInsideBooking =
				BookingHandler.getTime(newBooking.startingDate) >
					BookingHandler.getTime(booking.startingDate) &&
				BookingHandler.getTime(newBooking.startingDate) <=
					BookingHandler.getTime(booking.endingDate);

			const isSurroundingBooking =
				BookingHandler.getTime(newBooking.startingDate) <
					BookingHandler.getTime(booking.startingDate) &&
				BookingHandler.getTime(newBooking.endingDate) >=
					BookingHandler.getTime(booking.endingDate);

			if (isInsideBooking || isSurroundingBooking) {
				bool = false;
				return {
					isAvailable: bool,
					booking,
				};
			}
		}

		return {
			isAvailable: bool,
		};
	}

	public static setInputDateMinAttribute(lastBookings: BookingsType[]) {
		const today = new Date();

		lastBookings = BookingHandler.sortFromClosestToOlderBookings(lastBookings);

		for (const booking of lastBookings) {
			if (
				BookingHandler.getTime(booking.startingDate) > today.getTime() ||
				BookingHandler.getTime(booking.endingDate) < today.getTime()
			) {
				// Add 1 to month cause it start at 0.
				const month = today.getMonth() + 1;

				return `${today.getFullYear()}-${
					month < 10 ? `0${month}` : month
				}-${today.getDate()}`;
			} else {
				return booking.endingDate;
			}
		}
	}

	public static getDaysNumber(start: string, end: string) {
		const DAY = 1000 * 60 * 60 * 24;

		return Math.round(
			(BookingHandler.getTime(end) - BookingHandler.getTime(start)) / DAY,
		);
	}

	public static sortFromClosestToOlderBookings(bookings: BookingsType[]) {
		return bookings.sort(
			(a, b) =>
				BookingHandler.getTime(a.startingDate) -
				BookingHandler.getTime(b.startingDate),
		);
	}

	public static getIncomingDate(days: number) {
		const DAY = 1000 * 60 * 60 * 24;

		const day = new Date(Date.now() + DAY * days).getDate();
		const month = new Date(Date.now() + DAY * days).getMonth() + 1;
		const year = new Date(Date.now() + DAY * days).getFullYear();

		return `${year}-${month >= 10 ? month : `0${month}`}-${
			day >= 10 ? day : `0${day}`
		}`;
	}

	private static getTime(date: string) {
		return new Date(date).getTime();
	}
}
