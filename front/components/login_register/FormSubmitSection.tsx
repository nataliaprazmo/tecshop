import globalState from "@/lib/globalState";
import { Button } from "../ui/Button";
import { Loader } from "react-feather";

interface FormSubmitSectionProps {
	buttonText: string;
	isSubmitting: boolean;
	loadingText: string;
}

const FormSubmitSection: React.FC<FormSubmitSectionProps> = ({
	buttonText,
	isSubmitting,
	loadingText,
}) => {
	return (
		<Button type="submit" disabled={isSubmitting}>
			{isSubmitting && globalState.microinteractionsEnabled ? (
				<div className="flex items-center gap-2">
					<Loader className="animate-spin" size={16} />
					<span>{loadingText}</span>
				</div>
			) : (
				buttonText
			)}
		</Button>
	);
};

export default FormSubmitSection;
