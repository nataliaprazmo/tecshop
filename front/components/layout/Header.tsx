import Link from "next/link";
import SearchInput from "../ui/SearchInput";
import { ShoppingCart } from "react-feather";
import LoginHandler from "./LoginHandler";
import globalState from "@/lib/globalState";
import NavLink from "./NavLink";

const Header: React.FC = () => {
	return (
		<header className="w-full flex items-center justify-between px-20 py-6 shadow">
			<Link
				href="/"
				className={`text-3xl 2xl:text-4xl font-bold min-w-36 2xl:min-w-[164px] ${
					globalState.microinteractionsEnabled &&
					"hover:font-extrabold transition-all"
				}`}
			>
				TecSklep
			</Link>
			<div>
				<NavLink route="/" linkName="Strona główna" />
				<NavLink route="/products" linkName="Produkty" />
			</div>
			<div className="flex items-center gap-8 2xl:gap-10">
				<SearchInput />
				<LoginHandler />
				<Link
					href="/cart"
					className={`flex items-center font-semibold bg-gradient-to-r text-transparent bg-clip-text from-primary to-secondary ${
						globalState.microinteractionsEnabled &&
						"hover:scale-110 hover:bg-gradient-to-l transition-all"
					} text-base 2xl:text-xl`}
				>
					<ShoppingCart className="text-primary" />
					<span className="ml-2 2xl:ml-3">Koszyk</span>
				</Link>
				{/* <div className="flex items-center">
					<span className="text-sm">PLN</span>
					<ChevronDown />
				</div> */}
			</div>
		</header>
	);
};

export default Header;
