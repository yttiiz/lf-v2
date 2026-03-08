import { isUserConnected, useStore } from "@store";
import type { ItemType } from "@types";
import { useRef, useState } from "react";
import { ItemIcon } from "./ItemIcon";
import { ItemLink } from "./ItemLink";
import { ItemSubmenu } from "./ItemSubmenu";

export const Menu = ({ items }: { items?: ItemType[] }) => {
	const $isUserConnected = useStore(isUserConnected);
	const apartmentsListRef = useRef<HTMLUListElement | null>(null);
	const [isApartementListHidden, setIsApartementListHidden] = useState<
		boolean | null
	>(true);

	const itemContainerClassName =
		"not-last:border-b not-last:border-primary/20 hover:bg-primary/10";
	const itemClassName = "flex text-primary gap-2 items-center py-2 px-3";
	return (
		<ul>
			{items?.map(
				({
					textContent,
					href,
					isLink,
					isRelatedToUser,
					icon,
					itemsSubmenu,
				}) => {
					return isRelatedToUser && !$isUserConnected ? null : (
						<li
							key={textContent}
							className={itemContainerClassName}
						>
							{isLink ? (
								<ItemLink
									href={href}
									icon={icon}
									textContent={textContent}
									itemClassName={itemClassName}
								/>
							) : (
								<>
									<div
										className={`${itemClassName} cursor-pointer`}
										onClick={() => {
											if (apartmentsListRef.current) {
												setIsApartementListHidden(!isApartementListHidden);
											}
										}}
									>
										<span className="text-primary/40">
											<ItemIcon icon={icon} />
										</span>
										{textContent}
										<span
											className={`aspect-[1.25/1] w-1.5 bg-primary origin-center${
												isApartementListHidden ? "" : "rotate-180"
											}`}
											style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
										/>
									</div>
									<ItemSubmenu
										ref={apartmentsListRef}
										items={itemsSubmenu}
										isApartementListHidden={isApartementListHidden}
										classNames={{ itemContainerClassName, itemClassName }}
									/>
								</>
							)}
						</li>
					);
				},
			)}
		</ul>
	);
};
