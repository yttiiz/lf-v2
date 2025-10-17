import { useEffect, useRef } from "react";
import { useHandler } from "./hook";

export const RateInput = ({
	errorMessage,
	onChange,
}: {
	errorMessage: string;
	onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
}) => {
	const { handleInputs } = useHandler();
	const containerRef = useRef<HTMLDivElement | null>(null);
	const rateClassname =
		"flex justify-center items-center size-8 rounded-full bg-white border border-grey-dark/20";

	useEffect(() => {
		if (containerRef.current) handleInputs(containerRef.current);
	}, [handleInputs]);

	return (
		<div>
			<div
				ref={containerRef}
				className="flex flex-wrap gap-4"
			>
				{["pas terrible", "très moyen", "passable", "bien", "excellent"].map(
					(rate, index) => (
						<label
							key={rate}
							className="relative flex cursor-pointer items-center gap-2"
						>
							<span className={rateClassname}>{index + 1}</span>
							<input
								type="radio"
								name="rate"
								required
								value={index + 1}
								className="-z-1 absolute left-2.5"
								onChange={onChange}
							/>
							<span>{rate}</span>
						</label>
					),
				)}
			</div>
			<div className="mt-2 text-danger text-tiny">{errorMessage}</div>
		</div>
	);
};
