import globalState from "@/lib/globalState";
import { PasswordInputProps } from "@/types";
import { CheckCircle, Eye, EyeOff, XCircle } from "react-feather";

const PasswordInput: React.FC<PasswordInputProps> = ({
	id,
	name,
	placeholder,
	value,
	onChange,
	onBlur,
	error,
	touched,
	showPassword,
	toggleShowPassword,
}) => {
	const microinteractionsOn = globalState.microinteractionsEnabled;
	return (
		<div className="w-full">
			<div className="flex items-center gap-4 relative w-full">
				<input
					type={showPassword ? "text" : "password"}
					id={id}
					name={name}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					placeholder={placeholder}
					className={`w-full px-4 py-3 border rounded-lg ${
						microinteractionsOn &&
						`focus:outline-none focus:ring-2 ${
							touched && error
								? "border-red-700 focus:ring-red-200"
								: touched && !error
								? "border-primary focus:ring-indigo-200"
								: "border-gray-300 focus:ring-blue-200"
						}`
					}`}
				/>
				<div className="absolute right-6 flex items-center">
					<button
						type="button"
						onClick={toggleShowPassword}
						className="text-slate-400 focus:outline-none"
					>
						{microinteractionsOn &&
							(showPassword ? (
								<EyeOff className="h-5 w-5" />
							) : (
								<Eye className="h-5 w-5" />
							))}
					</button>
				</div>
				{microinteractionsOn && touched && (
					<div className="absolute -right-8">
						{error ? (
							<XCircle className="h-5 w-5 text-red-700" />
						) : (
							<CheckCircle className="h-5 w-5 text-primary" />
						)}
					</div>
				)}
			</div>
			{microinteractionsOn && touched && error && (
				<p className="mt-1 text-sm text-red-700">{error}</p>
			)}
		</div>
	);
};

export default PasswordInput;
