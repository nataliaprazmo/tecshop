const Details: React.FC<{
	title: string;
	content: string;
}> = ({ title, content }) => {
	return (
		<div className="border-b border-gray-200">
			<h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">
				{title}
			</h3>
			<div className="overflow-hidden text-gray-700 max-h-96 pb-6">
				{content}
			</div>
		</div>
	);
};

export default Details;
