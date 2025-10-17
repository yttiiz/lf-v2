import { IconSharedSolid, IconStarSolid } from "@components/shared/Icons/mod";
import { Link } from "@components/shared/Link/Link";
import type { ProductCardContentType } from "@types";
import { formatPrice, getUrl, rateAverage } from "@utils";
import { ProductSlider } from "./ProductSlider";

export const ProductCard = ({
	product: { thumbnail, name, href, pictures, description, details, review },
	onOpen,
	setProductUrl,
	setProductName,
}: {
	product: ProductCardContentType;
	onOpen: () => void;
	setProductUrl: React.Dispatch<React.SetStateAction<string>>;
	setProductName: React.Dispatch<React.SetStateAction<string>>;
}) => {
	return (
		<div className="flex flex-col">
			<ProductSlider pictures={pictures} />
			<div className="details flex flex-col gap-6 p-6">
				<div className="flex items-center gap-4">
					<div className="flex items-center">
						<figure>
							<img
								src={getUrl(thumbnail.src)}
								alt={thumbnail.alt}
								className="aspect-square w-12 rounded-full object-cover"
								loading="lazy"
								decoding="async"
								fetchPriority="low"
							/>
						</figure>
					</div>
					<div className="flex w-full flex-col xl:flex-row xl:items-center xl:justify-between">
						<div className="flex items-center gap-4 xl:block">
							<h3 className="text-2xl">{name}</h3>
							<h4 className="relative pt-[2px] text-xl xl:pt-0">
								{details.type}
							</h4>
						</div>
						<span>
							<strong className="text-terciary">
								{formatPrice(details.price)}
							</strong>{" "}
							/ nuit
						</span>
					</div>
				</div>
				<div>
					<p>{description}</p>
				</div>
			</div>
			<div className="buttons flex items-start justify-between px-6 pb-6">
				<div className="social-links flex items-start gap-3">
					<a
						href={`${href}#reviews`}
						className="pt-0.5 text-center font-medium text-sm"
						title="Notez-le !"
						data-link={rateAverage(review)}
						aria-label="link to product reviews"
					>
						<IconStarSolid className="size-6 text-primary transition-transform duration-300 hover:scale-110" />
					</a>
					<button
						type="button"
						className="cursor-pointer p-1 text-primary transition-transform duration-300 hover:scale-110"
						title="Partagez-le !"
						onClick={() => {
							setProductUrl(href);
							setProductName(name);
							onOpen();
						}}
					>
						<IconSharedSolid className="size-6" />
					</button>
				</div>
				<Link
					href={href}
					value="Découvrir"
					type="button"
				/>
			</div>
		</div>
	);
};
