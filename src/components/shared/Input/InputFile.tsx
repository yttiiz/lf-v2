import { cn, Input as InputHeroui } from "@heroui/react";
import type { InputPropsType } from "@types";
import { useRef, useState } from "react";
import { Icon } from "../Icons/Icon";
import { IconArrowUpCircleSolid } from "../Icons/IconArrowUpCircleSolid";
import { IconTrash } from "../Icons/IconTrash";
import { InputFileButton } from "./InputFileButton";

export const InputFile = ({
	label,
	name,
	required,
	value,
	placeholder,
	variant = "bordered",
	feedbackMessage,
	className,
	setFeedbackMessage,
	setFile,
	onImageSelected,
}: InputPropsType & {
	setFeedbackMessage: React.Dispatch<React.SetStateAction<string>>;
	setFile: React.Dispatch<React.SetStateAction<File | null>>;
	onImageSelected: (image: string | ArrayBuffer | undefined | null) => void;
}) => {
	const [currentValue, setCurrentValue] = useState(value);
	const [isImageSelected, setIsImageSelected] = useState(false);
	const inputFileRef = useRef<HTMLInputElement | null>(null);

	return (
		<div>
			<InputHeroui
				label={label}
				value={currentValue}
				isRequired={required}
				disabled
				type="text"
				labelPlacement="outside-top"
				startContent={<Icon icon="photo" />}
				endContent={
					<div>
						<InputFileButton
							className={isImageSelected ? "block" : "hidden"}
							icon={<IconTrash className="size-5 text-grey-dark/50" />}
							onClick={() => {
								if (inputFileRef.current) {
									inputFileRef.current.value = "";
									setFile(null);
									setIsImageSelected(false);
									setCurrentValue("");
								}

								if (feedbackMessage) {
									setFeedbackMessage("");
								}
							}}
						/>
						<InputFileButton
							className={isImageSelected ? "hidden" : "block"}
							icon={
								<IconArrowUpCircleSolid className="size-6 cursor-pointer text-primary" />
							}
							onClick={() => {
								if (inputFileRef.current) {
									inputFileRef.current.click();
									setCurrentValue("");
								}

								if (feedbackMessage) {
									setFeedbackMessage("");
								}
							}}
						/>
					</div>
				}
				placeholder={placeholder}
				variant={variant}
				size="lg"
				isInvalid={!!feedbackMessage}
				classNames={{
					base: cn("p-0"),
					label: cn("text-lg"),
					input: cn("text-lg truncate"),
					inputWrapper: cn("rounded-lg"),
				}}
				className={cn(className)}
				errorMessage={feedbackMessage}
			/>
			<input
				ref={inputFileRef}
				type="file"
				name={name}
				accept=".png, .jpg, .webp, .jpeg"
				className="hidden"
				onChange={(event) => {
					const image = event.currentTarget.files?.item(0);
					if (image) {
						setIsImageSelected(true);

						const reader = new FileReader();
						reader.readAsDataURL(image);
						reader.onload = (event) => {
							onImageSelected(event.target?.result);
						};
						setCurrentValue(image.name);
					}
				}}
			/>
		</div>
	);
};
