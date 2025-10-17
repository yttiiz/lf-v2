import type { ItemLinkPropsType } from "@types";
import { ItemIcon } from "./ItemIcon";

export const ItemLink = ({
	href,
	icon,
	textContent,
	itemClassName,
}: ItemLinkPropsType) => {
	return (
		<a
			href={href}
			className={itemClassName}
		>
			{icon ? (
				<span className="text-primary/40">
					<ItemIcon icon={icon} />
				</span>
			) : null}
			{textContent}
		</a>
	);
};
