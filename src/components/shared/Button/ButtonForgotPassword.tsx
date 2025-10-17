export const ButtonForgotPassword = ({ onOpen }: { onOpen: () => void }) => {
	return (
		<button
			className="w-full cursor-pointer pt-1 text-right text-sm hover:underline"
			type="button"
			onClick={onOpen}
		>
			Mot de passe oublié ?
		</button>
	);
};
