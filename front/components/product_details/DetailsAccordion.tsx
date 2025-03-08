import { ChevronDown, ChevronUp } from "react-feather";

const DetailsAccordion: React.FC<{
	title: string;
	content: string;
	isOpen: boolean;
	onClick: () => void;
}> = ({ title, content, isOpen, onClick }) => {
	return (
		<div className="border-b border-gray-200">
			<button
				className="w-full py-4 flex items-center justify-between focus:outline-none"
				onClick={onClick}
			>
				<h3 className="text-lg font-medium text-gray-900">{title}</h3>
				{isOpen ? (
					<ChevronUp className="h-5 w-5 text-gray-500" />
				) : (
					<ChevronDown className="h-5 w-5 text-gray-500" />
				)}
			</button>
			<div
				className={`overflow-hidden transition-all duration-300 text-gray-700 whitespace-pre-line ${
					isOpen ? "max-h-96 pb-4" : "max-h-0"
				}`}
			>
				{content}
			</div>
		</div>
	);
};

export default DetailsAccordion;
