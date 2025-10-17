import {
	IconChevronLeft,
	IconChevronRight,
	IconStar,
} from "@components/shared/Icons/mod";
import type { ImagesProductType, ReviewsProductSchemaWithIDType } from "@types";
import { getUrl, rateAverage, SliderHandler } from "@utils";
import { useEffect, useRef } from "react";

export const ProductFigure = ({
	pictures,
	reviews,
}: {
	pictures: ImagesProductType[];
	reviews: ReviewsProductSchemaWithIDType | { message: string } | undefined;
}) => {
	const navigationButtonClassName =
		"absolute top-[50%] -translate-y-[50%] cursor-pointer size-6 lg:size-8 flex justify-center items-center rounded-full bg-white/70 hover:bg-white/90 transition-colors duration-300";
	const sliderSize = `${100 * pictures.length}%`;
	const figureRef = useRef<HTMLDivElement | null>(null);
	const isReviewsOk = reviews && !("message" in reviews);

	useEffect(() => {
		if (figureRef.current) {
			new SliderHandler().handleHomeSlider(figureRef);
		}
	}, []);

	return (
		<figure
			ref={figureRef}
			className="as relative aspect-[4/3] w-full overflow-hidden lg:aspect-video lg:rounded-2xl"
		>
			<ul
				aria-label="slider"
				className="flex h-full transition duration-300"
				style={{ width: sliderSize }}
			>
				{pictures.map(({ src, alt }, index) => (
					<li
						key={`${alt}-${index + 1}`}
						className="w-full"
					>
						<img
							src={getUrl(src)}
							alt={alt}
							className="aspect-[4/3] w-full object-cover object-center lg:aspect-video"
						/>
					</li>
				))}
			</ul>
			<figcaption className="absolute bottom-0 z-2 flex w-full justify-between px-5 py-4">
				<span className="w-max self-end text-white">
					Cliquez sur les flèches pour faire défiler les images.
				</span>
				<span className="flex flex-col items-end text-secondary">
					<IconStar className="size-6 fill-secondary stroke-0" />
					{isReviewsOk ? (
						<strong>{rateAverage(reviews)}</strong>
					) : (
						<span>"chargement..."</span>
					)}
				</span>
			</figcaption>
			<div className="figcaption-shadow absolute bottom-0 z-1 h-[35%] w-full bg-gradient-to-b from-transparent to-black/80" />
			<button
				type="button"
				className={`${navigationButtonClassName} left-4 hidden pr-0.5 text-grey-dark`}
				aria-label="move slider left"
			>
				<IconChevronLeft className="size-[70%]" />
			</button>
			<button
				type="button"
				className={`${navigationButtonClassName} right-4 pl-0.5 text-grey-dark`}
				aria-label="move slider right"
			>
				<IconChevronRight className="size-[70%]" />
			</button>
			<ul className="landmarks hidden" />
		</figure>
	);
};
