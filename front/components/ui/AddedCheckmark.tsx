import { Check } from "react-feather";

const AddedCheckmark: React.FC = () => {
	return (
		<div className="relative transition-all px-6 w-46 h-10 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold flex gap-2 items-center justify-center">
			Dodano
			<Check className="mr-2" size={20} />
		</div>
	);
};

export default AddedCheckmark;
