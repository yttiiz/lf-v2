import type {
	AddReviewToProductType,
	BookAProductType,
	BookingsProductSchemaWithIDType,
	BookingsType,
	ContactMessageType,
	ItemType,
	ProductCardContentType,
	ProductSchemaWithIDType,
	ReviewsProductSchemaWithIDType,
	UserBookingsType,
} from "@types";
import { getUrl } from "@utils";
import { Fetcher } from "@yttiiz/utils";

export const getMenuData = (menuItems: ItemType[] | undefined) => {
	Fetcher.getData<ProductSchemaWithIDType[]>(getUrl("/api/products")).then(
		(res) => {
			if (res.ok) {
				const itemSubmenu = [];

				for (const product of res.data) {
					itemSubmenu.push({
						href: `/product/${product._id.toString()}`,
						textContent: `Aka ${product.name}`,
					});
				}

				if (menuItems) {
					for (const item of menuItems) {
						if (!item.isLink) {
							item.itemsSubmenu = [...itemSubmenu];
						}
					}
				}
			}
		},
	);

	return menuItems;
};

export const getProducts = async () => {
	type ProductRefinedReviewType = (ProductSchemaWithIDType & {
		review: ReviewsProductSchemaWithIDType;
	})[];

	const products: ProductCardContentType[] = [];
	const res = await Fetcher.getData<ProductRefinedReviewType>(
		getUrl("/api/products?withReview"),
	);

	if (res.ok) {
		for (const {
			details,
			description,
			name,
			thumbnail,
			pictures,
			_id,
			review,
		} of res.data) {
			products.push({
				details,
				description,
				href: `/product/${_id.toString()}`,
				name: `Aka ${name}`,
				thumbnail,
				pictures,
				review,
			});
		}
	}

	return products;
};

export const getProduct = async (id: string) => {
	const res = await Fetcher.getData<{
		product: ProductSchemaWithIDType;
		productBookings: BookingsProductSchemaWithIDType;
		reviewId: string;
	}>(getUrl(`/api/product/${id}`));

	if (res.ok) {
		return res.data;
	}
	return { message: res.message };
};

export const getReview = async (id: string) => {
	const res = await Fetcher.getData<ReviewsProductSchemaWithIDType>(
		getUrl(`/api/review?id=${id}`),
	);

	if (res.ok) {
		return res.data;
	}
	return { message: res.message };
};

export const getUserBookings = async (id: string) => {
	const res = await Fetcher.getData<
		{ ok: boolean; data: UserBookingsType[] } | { ok: boolean; message: string }
	>(getUrl(`/api/booking?id=${id}`));

	if (res.ok) {
		return res.data;
	}
	return { message: res.message };
};

export const postBookAProduct = async (data: BookAProductType) => {
	const res = await Fetcher.postData<{ ok: boolean; message: string }>(
		getUrl("/api/booking"),
		data,
	);

	if (res.ok) {
		return res.data;
	}

	return { ok: false, message: res.message };
};

export const postReviewToProduct = async (data: AddReviewToProductType) => {
	const res = await Fetcher.postData<{ ok: boolean; message: string }>(
		getUrl("api/review"),
		data,
	);

	if (res.ok) {
		return res.data;
	}

	return { ok: false, message: res.message };
};

export const postContactMessage = async (data: ContactMessageType) => {
	const res = await Fetcher.postData<{ ok: boolean; message: string }>(
		getUrl("api/contact"),
		data,
	);

	if (res.ok) {
		return res.data;
	}

	return { ok: false, message: res.message };
};

export const postResetPassword = async (email: string) => {
	const res = await Fetcher.postData<{ ok: boolean; message: string }>(
		getUrl("api/reset-password"),
		{
			email,
		},
	);

	if (res.ok) {
		return res.data;
	}

	return { ok: false, message: res.message };
};

export const postSendRegisterEmail = async (
	email: string,
	firstname: string,
) => {
	const res = await Fetcher.postData<{ ok: boolean; message: string }>(
		getUrl("api/register-email"),
		{
			email,
			firstname,
		},
	);

	if (res.ok) {
		return res.data;
	}

	return { ok: false, message: res.message };
};

export const postUploadImage = async (formData: FormData) => {
	const res = await Fetcher.postData<{ ok: boolean; message: string }>(
		getUrl("api/image-uploader"),
		formData,
	);

	if (res.ok) {
		return res.data;
	}

	return { ok: false, message: res.message };
};

export const deleteBooking = async ({
	id,
	data,
}: {
	id: string;
	data: BookingsType;
}) => {
	const res = await Fetcher.deleteData<{ ok: boolean; message: string }>(
		getUrl("api/booking"),
		{ id, data },
	);

	if (res.ok) {
		return res.data;
	}

	return { ok: false, message: res.message };
};
