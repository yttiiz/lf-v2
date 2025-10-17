import {
	IconBooking,
	IconCleanUp,
	IconEuro,
	IconEye,
	IconEyeSlash,
	IconHouse,
	IconLock,
	IconMail,
	IconPhoto,
	IconUser,
} from "@components/shared/Icons/mod";
import type { IconGenerateType } from "@types";

export const Icon = ({ icon }: IconGenerateType) => {
	switch (icon) {
		case "user": {
			return <IconUser className="size-5 text-grey-dark/50" />;
		}

		case "lock": {
			return <IconLock className="size-5 text-grey-dark/50" />;
		}

		case "email": {
			return <IconMail className="size-5 text-grey-dark/50" />;
		}

		case "eye-slash": {
			return <IconEyeSlash className="size-5 text-grey-dark/50" />;
		}

		case "eye": {
			return <IconEye className="size-5 text-grey-dark/50" />;
		}

		case "euro": {
			return <IconEuro className="size-5 text-grey-dark/50" />;
		}

		case "booking": {
			return <IconBooking className="size-5 text-grey-dark/50" />;
		}

		case "clean": {
			return <IconCleanUp className="size-5 text-grey-dark/50" />;
		}

		case "photo": {
			return <IconPhoto className="size-5 text-grey-dark/50" />;
		}
	}

	return <IconHouse className="size-5 text-grey-dark/50" />;
};
