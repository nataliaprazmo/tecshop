"use client";

import globalState from "@/lib/globalState";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "react-feather";

const Breadcrumbs: React.FC = () => {
	const pathname = usePathname();

	if (!globalState.microinteractionsEnabled) {
		return <></>;
	}

	const getBreadcrumbs = () => {
		const pathSegments = pathname
			.split("/")
			.filter((segment) => segment !== "");
		const breadcrumbs = [];

		breadcrumbs.push({
			label: "Strona główna",
			path: "/",
		});

		if (pathSegments.length > 0) {
			if (pathSegments.includes("products")) {
				breadcrumbs.push({
					label: "Produkty",
					path: "/products",
				});

				if (
					pathSegments.includes("details") &&
					pathSegments.length > 1 &&
					pathSegments[0] === "products"
				) {
					breadcrumbs.push({
						label: "Szczegóły",
						path: pathname,
					});
				}
			} else if (pathSegments.includes("cart")) {
				breadcrumbs.push({
					label: "Koszyk",
					path: "/cart",
				});
			} else if (pathSegments.includes("login")) {
				breadcrumbs.push({
					label: "Logowanie",
					path: "/login",
				});
			}
		}

		return breadcrumbs;
	};

	const breadcrumbs = getBreadcrumbs();

	if (breadcrumbs.length <= 1) {
		return null;
	}

	return (
		<div className="flex text-sm text-gray-700 font-medium mt-8 w-full px-20 transition-all">
			{breadcrumbs.map((breadcrumb, index) => (
				<li key={breadcrumb.path} className="flex items-center">
					{index > 0 && (
						<span className="mx-1.5">
							<ChevronRight size={16} />
						</span>
					)}
					{index === breadcrumbs.length - 1 ? (
						<span className="text-gray-800 font-semibold">
							{breadcrumb.label}
						</span>
					) : (
						<Link
							href={breadcrumb.path}
							className="text-gray-600 hover:text-primary transition-colors"
						>
							{breadcrumb.label}
						</Link>
					)}
				</li>
			))}
		</div>
	);
};

export default Breadcrumbs;
