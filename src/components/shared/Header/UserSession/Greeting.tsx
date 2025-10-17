import { Link } from "@components/shared/Link/Link";

export const Greeting = ({
	name,
	isHomePage,
}: {
	name?: string;
	isHomePage: boolean;
}) => {
	const now = new Date().getHours();

	return (
		<div className="flex items-center gap-1.5">
			<span
				className={`${
					isHomePage ? "text-white" : "text-primary"
				} transition-colors duration-300`}
			>
				{now > 18 || now < 6 ? "Bonsoir" : "Bonjour"}
			</span>
			<b
				className="max-w-[120px] truncate"
				title="Modifier votre profil"
			>
				<Link
					value={name?.split(" ")[0] ?? "visiteur"}
					variant={isHomePage ? "white" : "primary"}
					type="link"
					href="/user-profil"
				/>
			</b>
		</div>
	);
};
