import {
	IconChevronLeft,
	IconChevronRight,
} from "@components/shared/Icons/mod";
import type { ImagesProductType } from "@types";
import { getUrl, SliderHandler } from "@utils";
import { useEffect, useRef } from "react";

export const ProductSlider = ({
	pictures,
}: {
	pictures: ImagesProductType[];
}) => {
	const sliderSize = `${100 * pictures.length}%`;
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (containerRef.current) {
			new SliderHandler().handleHomeSlider(containerRef);
		}
	}, []);

	return (
		<div
			className="slider relative h-[300px] w-full overflow-hidden"
			data-slider-length={pictures.length}
			ref={containerRef}
		>
			<ul
				className="flex transition-transform duration-300"
				style={{ width: sliderSize }}
			>
				{pictures.map((picture) => (
					<li
						key={picture.alt}
						className="size-full"
					>
						<figure className="h-[300px] w-full">
							<img
								src={getUrl(picture.src)}
								alt={picture.alt}
								className="h-full w-full object-cover"
								loading="lazy"
							/>
						</figure>
					</li>
				))}
			</ul>
			<button
				type="button"
				className="hidden cursor-pointer"
				aria-label="move slider left"
			>
				<IconChevronLeft />
			</button>
			<button
				type="button"
				className="cursor-pointer"
				aria-label="move slider right"
			>
				<IconChevronRight />
			</button>
			<ul className="landmarks absolute bottom-[5%] left-[50%] z-5 flex -translate-x-[50%] justify-between" />
		</div>
	);
};
