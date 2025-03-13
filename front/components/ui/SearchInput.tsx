"use client";
import globalState from "@/lib/globalState";
import { SearchResult } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Search } from "react-feather";

const SearchInput: React.FC = () => {
	const [results, setResults] = useState<[SearchResult] | null>(null);
	const [isSearchFocused, setIsSearchFocused] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const searchRef = useRef<HTMLDivElement>(null);

	const getSearchResults = async (find: string) => {
		if (find !== "") {
			const response = await fetch(
				"http://localhost:5000/api/products/search?searchTerm=" + find,
				{
					method: "GET",
				}
			);
			if (response.status === 200) {
				const res = await response.json();
				if (res.length !== 0) setResults(res);
				else setResults(null);
			}
		} else setResults(null);
	};
	useEffect(() => {
		getSearchResults(searchTerm);
	}, [searchTerm, setSearchTerm]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				searchRef.current &&
				!searchRef.current.contains(event.target as Node)
			) {
				setIsSearchFocused(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const categories = [
		"laptop",
		"smartphone",
		"tablet",
		"smartwatch",
		"słuchawki bezprzewodowe",
		"słuchawki przewodowe",
	];

	return (
		<div className="relative" ref={searchRef}>
			<div
				className={`flex items-center border border-gray-400 rounded-xl gap-4 2xl:gap-6 px-4 2xl:px-6 py-2 2xl:py-3 w-fit max-w-80 ${
					globalState.microinteractionsEnabled &&
					"hover:border-indigo-500 group transition-all"
				}`}
			>
				<input
					type="text"
					placeholder="Szukaj produktów..."
					className={`outline-none bg-transparent text-sm 2xl:text-base text-slate-900 placeholder-slate-800 max-w-44 ${
						globalState.microinteractionsEnabled &&
						"group-hover:text-primary group-hover:placeholder-primary group-hover:font-semibold transition-all"
					}`}
					onFocus={() => {
						setIsSearchFocused(true);
						if (searchTerm) {
							getSearchResults(searchTerm);
						}
					}}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<Search
					className={`w-4 2xl:w-5 h-4 2xl:h-5 text-slate-900 ${
						globalState.microinteractionsEnabled &&
						"group-hover:text-primary"
					}`}
				/>
			</div>

			{isSearchFocused && globalState.microinteractionsEnabled && (
				<div className="fixed left-auto right-auto mt-2 w-64 bg-white/90 backdrop-blur-md shadow-lg rounded-xl border border-gray-300 z-50">
					<div className="p-3">
						<p className="text-sm text-slate-900 mb-2">
							{searchTerm
								? `Wyniki dla: ${searchTerm}`
								: "Wprowadź frazę aby wyszukać"}
						</p>
						{results ? (
							<div className="max-h-48 overflow-y-auto custom-scrollbar px-2 py-1">
								{results.map((product, id) => (
									<Link
										href={`/products/details/${product.id}`}
										key={id}
										className="group py-1 border border-transparent hover:shadow-sm hover:shadow-indigo-400/50 hover:bg-indigo-50 hover:border-indigo-300 hover:scale-105 px-1 cursor-pointer rounded-md w-full flex items-center gap-2 transition-all"
									>
										<div className="overflow-hidden rounded-sm flex-shrink-0 border border-gray-300">
											<Image
												src={product.imagePath}
												width={40}
												height={40}
												alt={product.name}
												className="transition-all object-cover aspect-square group-hover:scale-125"
											/>
										</div>
										<div className="flex flex-col truncate">
											<p className="font-semibold text-sm truncate group-hover:font-bold">
												{product.name}
											</p>
											<p className="text-gray-700 text-xs truncate">
												{
													categories[
														Number(
															product.categoryId
														) - 1
													]
												}
											</p>
										</div>
									</Link>
								))}
							</div>
						) : (
							searchTerm && (
								<p className="font-medium text-sm">
									Brak wyników
								</p>
							)
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default SearchInput;
