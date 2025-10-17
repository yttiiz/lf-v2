import { CardBody, Card as CardHeroui, cn } from "@heroui/react";

export const Card = ({ children }: { children: React.ReactNode }) => {
	return (
		<CardHeroui
			classNames={{
				base: cn("shadow-none border border-grey-dark/20"),
				body: cn("p-4"),
			}}
		>
			<CardBody>{children}</CardBody>
		</CardHeroui>
	);
};
