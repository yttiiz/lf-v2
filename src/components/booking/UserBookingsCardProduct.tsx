import { H2 } from "@components/shared/Heading/H2";
import { IconStar } from "@components/shared/Icons/mod";
import { Link } from "@components/shared/Link/Link";
import { Divider } from "@heroui/react";
import type { ProductSchemaType } from "@types";
import { formatPrice, rateAverage } from "@utils";

export const UserBookingsCardProduct = ({
	product,
	rates,
	linkToProduct,
}: {
	product: Omit<ProductSchemaType, "bookingId" | "reviewId">;
	rates: number[];
	linkToProduct: string;
}) => {
	return (
		<figure className="flex gap-4">
			<img
				className="hidden size-32 rounded-full object-cover object-center sm:block"
				src={product.thumbnail.src}
				alt={product.thumbnail.src}
			/>
			<figcaption className="flex flex-col gap-3">
				<div>
					<Link
						value={
							<H2 className="text-2xl text-terciary">Aka {product.name}</H2>
						}
						type="link"
						variant="terciary"
						href={linkToProduct}
					/>

					<span className="flex items-center gap-1">
						<IconStar className="size-6 fill-terciary/40 stroke-0" />
						<span className="pt-1">{rateAverage(rates)}</span>
					</span>
				</div>
				<ul>
					<li>
						Type : <b>{product.details.type}</b>
					</li>
					<li>
						Superficie : <b>{product.details.area}</b> m²
					</li>
					<li>
						Nombre de pièces : <b>{product.details.rooms}</b>
					</li>
				</ul>
				<Divider />
				<p>
					<strong className="text-2xl text-terciary">
						{formatPrice(product.details.price)}
					</strong>{" "}
					la nuit
				</p>
			</figcaption>
		</figure>
	);
};
