import { Search } from "react-feather";

const SearchInput: React.FC = () => {
	return (
		<div className="flex items-center border border-gray-400 rounded-xl gap-4 2xl:gap-6 px-4 2xl:px-6 py-2 2xl:py-3 w-fit max-w-80">
			<input
				type="text"
				placeholder="Szukaj produktów..."
				className="flex outline-none bg-transparent text-sm 2xl:text-base text-slate-900 placeholder-slate-800 max-w-44"
			/>
			<Search className="w-4 2xl:w-5 h-4 2xl:h-5 text-slate-900" />
		</div>
	);
};

export default SearchInput;
