import type { ReviewsType } from "@types";
import { RateProduct } from "@utils";
import { DateFormatter } from "@yttiiz/utils";
import { RateStars } from "./RateStars";

export const ProductReviewsListCard = ({
	reviews,
}: {
	reviews: ReviewsType[];
}) => {
	return (
		<dl>
			{reviews.map(({ userName, comment, timestamp, rate }, index) => (
				<div
					key={`${userName}-${index + 1}`}
					className="not-last:mb-6"
				>
					<dt>{userName}</dt>
					<dd>
						{comment ? <p>{comment}</p> : null}
						<p className="font-light">
							{comment ? "écrit" : "noté"} le{" "}
							{DateFormatter.display({
								date: timestamp,
								style: "normal",
							})}
						</p>
						<div className="mt-1 flex items-start gap-2">
							<span className="pt-0.5 font-medium">
								{rate}/{RateProduct.excellent}
							</span>
							<span className="pt-0.5">•</span>
							<RateStars
								rate={rate}
								rateProduct={RateProduct}
							/>
						</div>
					</dd>
				</div>
			))}
		</dl>
	);
};
