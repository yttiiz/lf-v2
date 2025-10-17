import { cn, Input as InputHeroui } from "@heroui/react";
import type { InputPropsType } from "@types";
import { Icon } from "../Icons/mod";

export const Input = ({
	label,
	type,
	name,
	required,
	disabled,
	value,
	placeholder,
	variant = "bordered",
	startContent,
	endContent,
	feedbackMessage,
	className,
	min,
	max,
	onChange,
}: InputPropsType) => {
	return (
		<InputHeroui
			label={label}
			name={name}
			value={value}
			isRequired={required}
			type={type}
			labelPlacement="outside-top"
			min={min}
			max={max}
			startContent={
				typeof startContent === "string" ? (
					<Icon icon={startContent} />
				) : (
					startContent
				)
			}
			endContent={
				typeof endContent === "string" ? <Icon icon={endContent} /> : endContent
			}
			placeholder={placeholder}
			variant={variant}
			size="lg"
			isInvalid={!!feedbackMessage}
			isDisabled={disabled}
			classNames={{
				label: cn("text-lg"),
				input: cn("text-lg"),
				inputWrapper: cn("rounded-lg bg-white"),
			}}
			className={cn(className)}
			errorMessage={feedbackMessage}
			autoComplete="on"
			onChange={onChange}
		/>
	);
};
