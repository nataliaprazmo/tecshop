"use client";

import globalState from "@/lib/globalState";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
	route: string;
	linkName: string;
}

const NavLink: React.FC<NavLinkProps> = ({ route, linkName }) => {
	const pathname = usePathname();
	const isActive =
		(route === "/" && pathname === "/") ||
		(route === "/products" && pathname.startsWith("/products"));
	const linkMicrointeractionsClasses = globalState.microinteractionsEnabled
		? `hover:font-bold hover:text-primary transition-all ${
				isActive && "font-bold"
		  }`
		: "";
	return (
		<Link
			href={route}
			className={`text-base 2xl:text-xl mr-4 2xl:mr-6 ${linkMicrointeractionsClasses}`}
		>
			{linkName}
		</Link>
	);
};

export default NavLink;
