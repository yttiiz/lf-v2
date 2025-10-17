import { IconStar } from "@components/shared/Icons/mod";

export const RateStars = ({
	rate,
	rateProduct,
}: {
	rate: number;
	rateProduct: {
		readonly excellent: 5;
		readonly good: 4;
		readonly quiteGood: 3;
		readonly bad: 2;
		readonly execrable: 1;
	};
}) => {
	const stars = [];

	for (let i = 0; i < rateProduct.excellent; i++) {
		stars.push(
			<li key={i + 1}>
				<IconStar
					className={`${
						i < rate ? "fill-terciary/40" : "fill-grey-dark/20"
					} size-6 stroke-0`}
				/>
			</li>,
		);
	}

	return (
		<ul
			title={`${rate}/${rateProduct.excellent}`}
			className="flex items-center gap-1"
		>
			{stars.map((star) => star)}
		</ul>
	);
};
