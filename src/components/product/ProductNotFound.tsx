import { Illustration } from "@components/shared/Error/Illustration";

export const ProductNotFound = () => {
	return (
		<section>
			<div className="container flex h-[var(--dvh-header)] items-center justify-center">
				<div className="flex flex-col items-center gap-3 text-center">
					<Illustration />
					<h1 className="font-semibold text-2xl">Appartement non trouvé</h1>
					<p>
						L'appartement recherché n'est pas accessible. Il y a un problème lié
						à la récupération de ses données.
						<br /> Nous travaillons pour régler ce problème le plus rapidement
						possible.
					</p>
				</div>
			</div>
		</section>
	);
};
