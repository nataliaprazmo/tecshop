import { LoginProps, FormErrors } from "@/types";
import InputField from "../ui/InputField";
import PasswordInput from "../ui/PasswordInput";

interface LoginFormFieldsProps {
	formData: LoginProps;
	errors: FormErrors;
	touched: Record<string, boolean>;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
	showPassword: boolean;
	setShowPassword: (show: boolean) => void;
}

const LoginFormFields: React.FC<LoginFormFieldsProps> = ({
	formData,
	errors,
	touched,
	handleChange,
	handleBlur,
	showPassword,
	setShowPassword,
}) => {
	return (
		<>
			{/* Email Input */}
			<InputField
				id="email"
				name="email"
				type="email"
				placeholder="Adres email"
				value={formData.email}
				onChange={handleChange}
				onBlur={handleBlur}
				error={errors.email}
				touched={!!touched.email}
			/>

			{/* Password Input */}
			<PasswordInput
				id="password"
				name="password"
				placeholder="Hasło"
				value={formData.password}
				onChange={handleChange}
				onBlur={handleBlur}
				error={errors.password}
				touched={!!touched.password}
				showPassword={showPassword}
				toggleShowPassword={() => setShowPassword(!showPassword)}
			/>
		</>
	);
};

export default LoginFormFields;
