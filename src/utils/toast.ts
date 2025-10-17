import { addToast } from "@heroui/react";

export const successToast = ({
	title,
	description,
}: {
	title: string;
	description: string | undefined;
}) =>
	addToast({
		title,
		description,
		variant: "flat",
		color: "success",
	});

export const errorToast = ({
	title,
	description,
}: {
	title: string;
	description: string | undefined;
}) =>
	addToast({
		title,
		description,
		variant: "flat",
		color: "danger",
	});
