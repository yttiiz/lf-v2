import type { ItemSubmenuPropsType } from "@types";
import { ItemLink } from "./ItemLink";

export const ItemSubmenu = ({
	isApartementListHidden,
	items,
	classNames: { itemContainerClassName, itemClassName },
	ref,
}: ItemSubmenuPropsType) => {
	return (
		<ul
			ref={ref}
			className={`bg-primary/5 ${isApartementListHidden ? "hidden" : ""}`}
		>
			{items?.map(({ href, textContent }) => (
				<li
					key={textContent}
					className={`${itemContainerClassName} grid grid-cols-[10px_auto] items-center first:border-t`}
				>
					<span className="ml-2 h-[60%] w-0.5 rounded bg-primary/30" />
					<ItemLink
						href={href}
						textContent={textContent}
						itemClassName={itemClassName}
					/>
				</li>
			))}
		</ul>
	);
};
