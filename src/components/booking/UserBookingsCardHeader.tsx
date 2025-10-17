import { getGMT } from "@utils";
import { DateFormatter } from "@yttiiz/utils";

export const UserBookingsCardHeader = ({
	createdAt,
	startingDate,
	endingDate,
}: {
	createdAt: number;
	startingDate: string;
	endingDate: string;
}) => {
	return (
		<header className="flex flex-col gap-3 bg-grey-dark/10 p-6 sm:flex-row sm:justify-between">
			<div className="grid">
				<strong className="text-primary">Réservation effectuée le</strong>
				<span>
					{DateFormatter.display({ date: createdAt, style: "normal" })}
				</span>
			</div>
			<div className="grid sm:text-right">
				<strong className="text-primary">Pour la période du</strong>
				<span>
					{DateFormatter.display({
						date: new Date(startingDate).getTime() + getGMT(),
						style: "normal",
					})}{" "}
					au{" "}
					{DateFormatter.display({
						date: new Date(endingDate).getTime() + getGMT(),
						style: "normal",
					})}
				</span>
			</div>
		</header>
	);
};
