import { ToastProvider } from "@components/shared/ToastProvider/ToastProvider";
import { cn, Tab, Tabs } from "@heroui/react";
import { UserConnexion } from "./UserConnexion";
import { UserDeleteAccount } from "./UserDeleteAccount";
import { UserIdentity } from "./UserIdentity";

export const UserProfil = ({
	deleteUserContent,
}: {
	deleteUserContent: { title: string; warningTextContent: string };
}) => {
	return (
		<ToastProvider>
			<div className="flex w-full flex-col">
				<Tabs
					radius="full"
					aria-label="Options"
					color="primary"
					classNames={{
						tabWrapper: cn("bg-primary"),
						tabContent: cn("text-grey-dark"),
					}}
				>
					<Tab
						key="identity"
						title="Identité"
					>
						<UserIdentity />
					</Tab>
					<Tab
						key="connexion"
						title="Connexion"
					>
						<UserConnexion />
					</Tab>
					<Tab
						key="delete"
						title="Supprimer mon compte"
					>
						<UserDeleteAccount deleteUserContent={deleteUserContent} />
					</Tab>
				</Tabs>
			</div>
		</ToastProvider>
	);
};
