import { Greeting } from "@components/shared/Header/UserSession/Greeting";
import { Link } from "@components/shared/Link/Link";
import { Avatar } from "@heroui/react";
import {
	isUserConnected as isUserConnectedStore,
	user as userStore,
} from "@store";
import type { ItemLoginType, UserType } from "@types";

export const UserSession = ({
	user,
	isHomePage,
	items,
}: {
	user: UserType;
	isHomePage: boolean;
	items: ItemLoginType[];
}) => {
	// Set user
	userStore.set(user);

	let firstName = "";
	let lastName = "";

	if (user) {
		const userNameSplit = user.name.split(" ");
		firstName = userNameSplit[0];
		lastName = userNameSplit[1];
	}

	// Set user connexion
	const isUserConnected = !!user;
	isUserConnectedStore.set(isUserConnected);

	return (
		<div id="user-session">
			{isUserConnected ? (
				<div className="user-logged-in flex items-center gap-2">
					<Greeting
						name={user.name}
						isHomePage={isHomePage}
					/>
					<Avatar
						onClick={() => {
							globalThis.location.href = "/user-profil";
						}}
						className="cursor-pointer"
						src={user.image ?? ""}
						name={`${firstName.slice(0, 1)}${lastName.slice(0, 1)}`}
						size="sm"
					/>
				</div>
			) : (
				<div className="login flex items-center gap-4">
					{items.map(({ href, textContent, isButton }, index) => (
						<Link
							key={`${textContent}-${index + 1}`}
							href={href}
							type={isButton ? "button" : "link"}
							value={textContent}
							variant={isHomePage ? "white" : "primary"}
						/>
					))}
				</div>
			)}
		</div>
	);
};
