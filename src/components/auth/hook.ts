import { navigate } from "astro:transitions/client";
import { useAuth } from "@better-auth";
import { postResetPassword, postUploadImage } from "@sdk";
import { useMutation } from "@tanstack/react-query";
import type { UserRegistrationType } from "@types";
import { isEmpty, successToast } from "@utils";
import type { Area } from "react-easy-crop";
import { queryClient } from "tanstack-store";

// Query
export const useResetPassword = () => {
	const mutation = useMutation(
		{
			mutationFn: async (email: string) => postResetPassword(email),
		},
		queryClient,
	);

	return mutation;
};

export const useUploadImage = () => {
	const mutation = useMutation(
		{
			mutationFn: async (formData: FormData) => postUploadImage(formData),
		},
		queryClient,
	);

	return mutation;
};

// Helper
export const handleUserRegistration = async ({
	firstName,
	lastName,
	email,
	password,
	image,
	setEmailErrorMessage,
}: UserRegistrationType & {
	setEmailErrorMessage: (value: React.SetStateAction<string>) => void;
}) => {
	const { success, error } = await useAuth().handleSignUp({
		firstName,
		lastName,
		email,
		password,
		image,
	});

	if (success) {
		successToast({
			title: "Félicitations",
			description: "Votre compte a bien été créé.",
		});
		return setTimeout(() => {
			navigate("/");
		}, 3000);
	}

	if (error) {
		setEmailErrorMessage(error.message);
	}
};

export const onCropDone = (
	imageCroppedArea: Area | null,
	image: string | ArrayBuffer | undefined | null,
) => {
	const canvasElement = document.createElement("canvas");

	if (!imageCroppedArea) return null;

	canvasElement.width = imageCroppedArea.width;
	canvasElement.height = imageCroppedArea.height;

	const isImageOk = !!image && typeof image === "string";
	if (!isImageOk) return null;

	const newImage = new Image();
	const context = canvasElement.getContext("2d");

	if (!context) return null;

	newImage.src = image;
	context.drawImage(
		newImage,
		imageCroppedArea.x,
		imageCroppedArea.y,
		imageCroppedArea.width,
		imageCroppedArea.height,
		0,
		0,
		imageCroppedArea.width,
		imageCroppedArea.height,
	);

	return new Promise((res, _) => {
		canvasElement.toBlob((blob) => {
			if (blob) {
				const file = new File([blob], "user-avatar", {
					type: "image/png", // WIP - find a way to trigger the right extension.
				});
				res(file);
			}
		});
	});
};

// Validator
export const useValidator = () => {
	const validatePasswordMatch = (
		password: string | undefined,
		confirmPassword: string | undefined,
	) => {
		if (password !== confirmPassword)
			return "Les mots de passe ne correspondent pas";
		return null;
	};

	const validatePasswordLength = (value: string | undefined) => {
		if (isEmpty(value)) return isEmpty(value);
		if ((value as string).length < 8)
			return "Le mot de passe doit contenir au moins 8 caractères";
		return null;
	};

	return {
		validatePasswordMatch,
		validatePasswordLength,
	};
};
