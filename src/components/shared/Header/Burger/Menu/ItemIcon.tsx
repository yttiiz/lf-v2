import {
	IconBooking,
	IconHouse,
	IconMail,
	IconStar,
} from "@components/shared/Icons/mod";
import type { IconMenuItemType } from "@types";

export const ItemIcon = ({ icon }: { icon?: IconMenuItemType }) => {
	switch (icon) {
		case "house": {
			return <IconHouse className="size-5" />;
		}

		case "mail": {
			return <IconMail className="size-5" />;
		}

		case "booking": {
			return <IconBooking className="size-5" />;
		}

		case "star": {
			return <IconStar className="size-5" />;
		}
	}
};
