import { useAuth } from "@better-auth";
import { Button } from "../Button/Button";
import { IconPower } from "../Icons/IconPower";

export const Logout = () => {
	const { handleSignOut } = useAuth();
	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		await handleSignOut();
	};

	return (
		<form
			id="logout"
			method="POST"
			onSubmit={onSubmit}
		>
			<Button
				type="submit"
				value="Déconnexion"
				variant="black"
				startContent={<IconPower className="size-4" />}
				className="text-xs"
			/>
		</form>
	);
};
