import { postContactMessage } from "@sdk";
import { useMutation } from "@tanstack/react-query";
import type { ContactMessageType } from "@types";
import { queryClient } from "tanstack-store";

// Query
export const useContactMessage = () => {
	const mutation = useMutation(
		{
			mutationFn: async ({
				firstName,
				lastName,
				email,
				message,
			}: ContactMessageType) =>
				await postContactMessage({
					firstName,
					lastName,
					email,
					message,
				}),
		},
		queryClient,
	);

	return mutation;
};

// Validator
export const validateMessage = (value?: string) => {
	if (!value) return "Veuillez renseigner un message.";
	const dateRegex =
		/^[0-9a-zA-ZàâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ\s.,:;!?\-()'"]+$/;
	if (!dateRegex.test(value))
		return "Veuillez renseigner un message sans caractères spéciaux.";
	return null;
};
