import { cn, Input as InputHeroui } from "@heroui/react";
import type { InputPropsType } from "@types";
import { useState } from "react";
import { Icon } from "../Icons/Icon";

export const InputPassword = ({
	label,
	name,
	required,
	value,
	placeholder,
	variant = "bordered",
	feedbackMessage,
	className,
	forgotPassword,
	onChange,
}: InputPropsType & {
	forgotPassword?: React.ReactNode;
}) => {
	const [isPasswordType, setIsPasswordType] = useState(true);

	return (
		<div>
			<InputHeroui
				label={label}
				name={name}
				value={value}
				isRequired={required}
				type={isPasswordType ? "password" : "text"}
				labelPlacement="outside-top"
				startContent={<Icon icon="lock" />}
				endContent={
					<button
						type="button"
						className="cursor-pointer"
						onClick={() => setIsPasswordType(!isPasswordType)}
					>
						<Icon icon={isPasswordType ? "eye-slash" : "eye"} />
					</button>
				}
				placeholder={placeholder}
				variant={variant}
				size="lg"
				isInvalid={!!feedbackMessage}
				classNames={{
					base: cn("p-0"),
					label: cn("text-lg"),
					input: cn("text-lg"),
					inputWrapper: cn("rounded-lg"),
				}}
				className={cn(className)}
				errorMessage={feedbackMessage}
				autoComplete="on"
				onChange={onChange}
			/>
			{forgotPassword ? forgotPassword : null}
		</div>
	);
};
