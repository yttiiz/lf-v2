import { H2 } from "@components/shared/Heading/H2";
import type { DetailsProductType } from "@types";

export const ProductDescription = ({
	details,
}: {
	details: DetailsProductType;
}) => {
	return (
		<div id="description">
			<H2 className="mb-4 border-grey-dark/40 border-b pb-4">
				Description de l'appartement
			</H2>
			<ul className="grid w-full gap-2 lg:w-[50%]">
				<li>
					Type : <b>{details.type}</b>
				</li>
				<li>
					Superficie : <b>{details.area}</b> m²
				</li>
				<li>
					Nombre de pièces : <b>{details.rooms}</b>
				</li>
				<li>
					Nombre de personnes :{" "}
					<b>{details.persons.toString().replace(",", " à ")}</b>
				</li>
			</ul>
		</div>
	);
};
