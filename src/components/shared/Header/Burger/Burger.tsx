import { Popover } from "@components/shared/Popover/Popover";
import { getMenuData } from "@sdk";
import type { ItemType } from "@types";
import { useRef } from "react";
import { Menu } from "./Menu/Menu";

export const Burger = ({
	isHomePage = false,
	menuItems,
}: {
	isHomePage: boolean;
	menuItems?: ItemType[];
}) => {
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	menuItems = getMenuData(menuItems);

	return (
		<div id="burger">
			<Popover
				onOpenChange={() => {
					if (buttonRef.current) {
						const lines = buttonRef.current.children;
						let key = 1;
						for (const line of lines) {
							line.classList.toggle(`line-${key}`);
							key++;
						}
					}
				}}
				trigger={
					<button
						ref={buttonRef}
						type="button"
						aria-label="open navigation menu"
					>
						<span
							className={
								isHomePage ? "is-home-page transition-colors duration-300" : ""
							}
						/>
						<span
							className={
								isHomePage ? "is-home-page transition-colors duration-300" : ""
							}
						/>
						<span
							className={
								isHomePage ? "is-home-page transition-colors duration-300" : ""
							}
						/>
					</button>
				}
				children={<Menu items={menuItems} />}
				classNames={{
					content: "p-0 bg-white overflow-hidden rounded-lg shadow",
				}}
			/>
		</div>
	);
};
