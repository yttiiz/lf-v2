import { IconCopyClipboard } from "@components/shared/Icons/mod";
import { Modal } from "@components/shared/Modal/Modal";
import { cn, Tooltip, useDisclosure } from "@heroui/react";
import type { ProductCardContentType } from "@types";
import { getUrl } from "@utils";
import { useState } from "react";
import { ProductCard } from "./ProductCard";

type Props = {
	products: ProductCardContentType[];
};

export const ProductsList = ({ products }: Props) => {
	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
	const [productUrl, setProductUrl] = useState("");
	const [productName, setProductName] = useState("");
	const [isTooltipOpen, setIsTooltipOpen] = useState(false);

	const handleCopyClipboard = async () => {
		await globalThis.navigator.clipboard.writeText(getUrl(productUrl));

		setIsTooltipOpen(true);
		setTimeout(() => {
			setIsTooltipOpen(false);
		}, 1500);
	};

	if (!products || products.length === 0) {
		return (
			<div className="flex justify-center">
				<p className="text-grey-dark">
					Aucun produit disponible pour le moment.
				</p>
			</div>
		);
	}

	return (
		<>
			<ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
				{products.map((product) => (
					<li
						key={product.name}
						className="overflow-hidden rounded-2xl border border-dark/25 transition-transform duration-300 will-change-transform hover:scale-105 hover:shadow"
					>
						<ProductCard
							product={product}
							onOpen={onOpen}
							setProductUrl={setProductUrl}
							setProductName={setProductName}
						/>
					</li>
				))}
			</ul>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				onOpenChange={onOpenChange}
				headerTitle="Partagez sur les réseaux"
				bodyContent={
					<div className="grid gap-4">
						<p>
							Copiez le lien vers <b>{productName}</b>, ci-dessous, pour le
							partager où vous le souhaitez.
						</p>
						<div className="flex rounded-xl border border-grey-dark/20 bg-white p-1">
							<input
								readOnly
								type="text"
								className="w-full px-2 py-1 outline-none"
								value={getUrl(productUrl)}
							/>
							<Tooltip
								content="copié !!"
								placement="top"
								isOpen={isTooltipOpen}
								classNames={{
									content: cn(
										"bg-[#e7f9ef] shadow-none border border-success text-success",
									),
								}}
								offset={15}
							>
								<button
									type="button"
									className="cursor-pointer p-2"
									onClick={async () => await handleCopyClipboard()}
								>
									<IconCopyClipboard className="size-5 text-grey-dark transition-colors duration-300 hover:text-primary" />
								</button>
							</Tooltip>
						</div>
					</div>
				}
			/>
		</>
	);
};
