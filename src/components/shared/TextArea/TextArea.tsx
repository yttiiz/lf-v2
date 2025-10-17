import { cn, Textarea } from "@heroui/react";
import type { TextAreaPropsType } from "@types";

export const TextArea = ({
	label,
	value,
	name,
	maxLength,
	minLength,
	required,
	placeholder,
	feedbackMessage,
	variant = "bordered",
	maxRows = 3,
	minRows,
	onChange,
}: TextAreaPropsType) => {
	return (
		<Textarea
			label={label}
			name={name}
			value={value}
			placeholder={placeholder}
			maxLength={maxLength}
			minLength={minLength}
			required={required}
			isRequired={required}
			variant={variant}
			maxRows={maxRows}
			minRows={minRows}
			classNames={{
				label: cn("text-lg"),
				input: cn("py-2 text-lg"),
				inputWrapper: cn("bg-white rounded-lg"),
			}}
			isInvalid={!!feedbackMessage}
			errorMessage={feedbackMessage}
			labelPlacement="outside-top"
			onChange={onChange}
		/>
	);
};
