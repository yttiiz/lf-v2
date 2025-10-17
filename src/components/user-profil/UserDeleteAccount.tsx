import { navigate } from "astro:transitions/client";
import { deleteUser } from "@better-auth";
import { Button } from "@components/shared/Button/Button";
import { Modal } from "@components/shared/Modal/Modal";
import { useDisclosure } from "@heroui/react";
import { errorToast, successToast } from "@utils";
import { Card } from "./Card";

export const UserDeleteAccount = ({
	deleteUserContent: { title, warningTextContent },
}: {
	deleteUserContent: {
		title: string;
		warningTextContent: string;
	};
}) => {
	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
	const onDeleteUser = async () => {
		const result = await deleteUser();

		if (result.data) {
			successToast({
				title: "Compte supprimé",
				description: "Votre compte a bien été supprimé.",
			});
			setTimeout(() => {
				navigate("/");
			}, 3000);
		} else {
			// Show error
			errorToast({
				title: "Erreur",
				description:
					"Votre compte n'a pas pu être supprimé. Veuillez réessayer ultérieurement.",
			});
		}
	};

	return (
		<>
			<Card>
				<div className="flex w-full flex-col gap-4">
					<div>
						<h4 className="font-semibold">{title}</h4>
						<p dangerouslySetInnerHTML={{ __html: warningTextContent }} />
					</div>
					<div className="flex justify-end">
						<Button
							value="Supprimer le compte"
							type="button"
							variant="danger"
							onClick={onOpen}
						/>
					</div>
				</div>
			</Card>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				onOpenChange={onOpenChange}
				headerTitle="Supprimer votre compte"
				bodyContent={
					<p>Etes-vous vraiment sûr(e) de vouloir supprimer votre compte ?</p>
				}
				hasCancelButton
				buttonActionContent={{
					value: "Supprimer",
					variant: "danger",
					onClick: onDeleteUser,
				}}
			/>
		</>
	);
};
