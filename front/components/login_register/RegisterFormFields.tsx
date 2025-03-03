import { FormData, FormErrors } from "@/types";
import InputField from "../ui/InputField";
import PasswordInput from "../ui/PasswordInput";

interface RegisterFormFieldsProps {
  formData: FormData;
  errors: FormErrors;
  touched: Record<string, boolean>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  passwordVisibilityProps: {
    showPassword: boolean;
    setShowPassword: (show: boolean) => void;
    showConfirmPassword: boolean;
    setShowConfirmPassword: (show: boolean) => void;
  };
}

const RegisterFormFields: React.FC<RegisterFormFieldsProps> = ({
  formData,
  errors,
  touched,
  handleChange,
  handleBlur,
  passwordVisibilityProps
}) => {
  const { showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword } = passwordVisibilityProps;
  
  return (
    <>
      {/* Name Input */}
      <InputField
        id="username"
        name="username"
        type="text"
        placeholder="Nazwa użytkownika"
        value={formData.username}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.username}
        touched={!!touched.username}
      />

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
        helperText="Email musi zawierać @ oraz nazwę domeny po znaku ."
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

      {/* Confirm Password Input */}
      <PasswordInput
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Potwierdź hasło"
        value={formData.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.confirmPassword}
        touched={!!touched.confirmPassword}
        showPassword={showConfirmPassword}
        toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
      />
    </>
  );
};

export default RegisterFormFields;