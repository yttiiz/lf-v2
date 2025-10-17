import { Button } from "@components/shared/Button/Button";
import { H3 } from "@components/shared/Heading/H3";
import { Link } from "@components/shared/Link/Link";
import { TextArea } from "@components/shared/TextArea/TextArea";
import { ToastProvider } from "@components/shared/ToastProvider/ToastProvider";
import {
	currentProduct,
	currentReviewId,
	isUserConnected,
	user,
	useStore,
} from "@store";
import { errorToast, successToast } from "@utils";
import { useState } from "react";
import { useAddReviewToProduct, useValidator } from "./hook";
import { RateInput } from "./RateInput";

export const ProductReviewForm = ({ refetch }: { refetch: () => void }) => {
	const $user = useStore(user);
	const $isUserConnected = useStore(isUserConnected);
	const $currentProduct = useStore(currentProduct);
	const $reviewId = useStore(currentReviewId);

	const [reviewErrorMessage, setReviewErrorMessage] = useState("");
	const [rateErrorMessage, setRateErrorMessage] = useState("");

	const { validateReview, validateRate } = useValidator();

	const mutation = useAddReviewToProduct();

	const onReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.currentTarget.value ? setReviewErrorMessage("") : null;
	};
	const onRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.currentTarget.value ? setRateErrorMessage("") : null;
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const review = formData.get("review")?.toString();

		if (review) {
			const verifyReview = validateReview(review);
			if (verifyReview) return setReviewErrorMessage(verifyReview);
		}

		const rate = formData.get("rate")?.toString();

		if (rate) {
			const verifyRate = validateRate(rate);
			if (verifyRate) return setRateErrorMessage(verifyRate);
		}

		mutation.mutate(
			{
				id: $currentProduct?.id ?? "",
				userId: $user?.id ?? "",
				userName: $user?.name ?? "",
				reviewId: $reviewId,
				review: review ?? "",
				rate: rate ?? "",
			},
			{
				onSuccess: (data) => {
					successToast({
						title: "Avis enregistré",
						description: data.message,
					});
					refetch();
				},
				onError: (err) => {
					errorToast({
						title: "Erreur",
						description: err.message,
					});
				},
			},
		);
	};

	return (
		<div id="review-form">
			<H3 className="mb-4 border-grey-dark/40 border-b pb-4">
				Donnez votre avis !
			</H3>
			<div className="w-full lg:w-[50%]">
				{$isUserConnected ? (
					<ToastProvider>
						<form
							method="POST"
							className="grid gap-6"
							onSubmit={onSubmit}
						>
							<TextArea
								label="Message"
								name="review"
								placeholder="Votre avis..."
								required={false}
								minLength={2}
								maxLength={500}
								feedbackMessage={reviewErrorMessage}
								onChange={onReviewChange}
							/>
							<RateInput
								errorMessage={rateErrorMessage}
								onChange={onRateChange}
							/>
							<Button
								type="submit"
								value="Soumettre"
							/>
						</form>
					</ToastProvider>
				) : (
					<>
						<p className="mb-4">Connectez-vous pour pouvoir laisser un avis.</p>
						<div className="flex items-center gap-4">
							<Link
								value="Se connecter"
								type="link"
								href="/login"
							/>
							<Link
								value="Créer un compte"
								type="button"
								href="/register"
							/>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
