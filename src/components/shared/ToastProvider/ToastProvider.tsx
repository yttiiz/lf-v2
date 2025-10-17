import { HeroUIProvider } from "@heroui/react";
import { ToastProvider as Toast } from "@heroui/toast";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<HeroUIProvider className="w-full">
			<Toast placement="top-center" />
			{children}
		</HeroUIProvider>
	);
};
