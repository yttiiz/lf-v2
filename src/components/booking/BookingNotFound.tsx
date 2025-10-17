import { Illustration } from "@components/shared/Error/Illustration";

export const BookingNotFound = ({
	message,
}: {
	message: string | undefined;
}) => {
	if (!message) {
		message =
			"Vos réservations ne sont pas accessibles. Il y a un problème lié à la récupération de ses données.<br />Nous travaillons pour régler ce problème le plus rapidement possible.";
	}

	return (
		<div className="flex flex-col items-center gap-3 text-center">
			<Illustration />
			<h1 className="font-semibold text-2xl">Aucune réservation trouvée</h1>
			<p dangerouslySetInnerHTML={{ __html: message }} />
		</div>
	);
};
