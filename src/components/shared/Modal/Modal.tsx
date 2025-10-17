import {
	cn,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Modal as ModalHeroui,
} from "@heroui/react";
import type { ModalPropsType } from "@types";
import { Button } from "../Button/Button";

export const Modal = ({
	isOpen,
	size = "lg",
	headerTitle,
	bodyContent,
	buttonActionContent,
	hasCancelButton = false,
	className,
	onClose,
	onOpenChange,
}: ModalPropsType) => {
	const isFooterFilled = !!hasCancelButton || !!buttonActionContent;

	return (
		<ModalHeroui
			isOpen={isOpen}
			size={size}
			onClose={onClose}
			onOpenChange={onOpenChange}
			className={className}
			classNames={{
				base: cn("w-[90%]"),
				backdrop: cn("bg-overlay/60"),
				header: cn("border-b border-b-grey-dark/20"),
				closeButton: cn("top-3 end-3 cursor-pointer"),
				body: cn("py-6", isFooterFilled ? "pb-2" : "pb-6"),
				footer: cn(isFooterFilled ? "px-6 py-4" : "px-0 py-0"),
			}}
		>
			<ModalContent>
				<ModalHeader>{headerTitle}</ModalHeader>
				<ModalBody>{bodyContent}</ModalBody>
				<ModalFooter>
					{hasCancelButton ? (
						<Button
							type="button"
							value="Annuler"
							variant="white-bordered"
							onClick={onClose}
						/>
					) : null}
					{buttonActionContent ? (
						<Button
							type="button"
							value={buttonActionContent.value}
							variant={buttonActionContent.variant ?? "primary"}
							onClick={buttonActionContent.onClick}
						/>
					) : null}
				</ModalFooter>
			</ModalContent>
		</ModalHeroui>
	);
};
