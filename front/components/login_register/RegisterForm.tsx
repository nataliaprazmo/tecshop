"use client";

import { AuthFormProps, FormData } from "@/types";
import { useState } from "react";
import { useFormValidation } from "@/hooks/useFormValidation";
import { submitRegisterForm } from "@/utils/authSubmit";
import RegisterFormFields from "./RegisterFormFields";
import FormSubmitSection from "./FormSubmitSection";

const initialFormData: FormData = {
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const RegisterForm: React.FC<AuthFormProps> = ({ changeForm }) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] =
		useState<boolean>(false);

	const {
		formData,
		errors,
		touched,
		isSubmitting,
		setIsSubmitting,
		submitError,
		setSubmitError,
		handleChange,
		handleBlur,
		validateForm,
	} = useFormValidation<FormData>(initialFormData);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validate all fields
		const isValid = validateForm([
			"username",
			"email",
			"password",
			"confirmPassword",
		]);

		if (isValid) {
			console.log("Form submitted:", formData);

			// API call
			try {
				setIsSubmitting(true);
				setSubmitError(null);

				const data = await submitRegisterForm(formData);

				console.log("Registration successful:", data);
				changeForm(); // Redirect to login page
			} catch (error) {
				console.error("Registration error:", error);
				setSubmitError(
					error instanceof Error
						? error.message
						: "Wystąpił błąd podczas rejestracji"
				);
			} finally {
				setIsSubmitting(false);
			}
		}
	};

	const passwordVisibilityProps = {
		showPassword,
		setShowPassword,
		showConfirmPassword,
		setShowConfirmPassword,
	};

	return (
		<div className="flex flex-col items-center justify-center px-10 md:px-20 w-full">
			<h2 className="text-3xl font-bold mb-6 text-center">
				Zarejestruj się
			</h2>
			<form
				onSubmit={handleSubmit}
				className="space-y-4 w-full flex flex-col items-center"
			>
				<RegisterFormFields
					formData={formData}
					errors={errors}
					touched={touched}
					handleChange={handleChange}
					handleBlur={handleBlur}
					passwordVisibilityProps={passwordVisibilityProps}
				/>

				{/* Submit error message */}
				{submitError && (
					<div className="w-full text-red-500 text-sm mt-2">
						{submitError}
					</div>
				)}

				<FormSubmitSection
					buttonText="Utwórz konto"
					isSubmitting={isSubmitting}
					loadingText="Przetwarzanie..."
				/>
			</form>
			<div className="mt-12">
				<span>Posiadasz już konto?</span>
				<button
					onClick={changeForm}
					className="ml-2 underline font-semibold cursor-pointer"
				>
					Zaloguj się
				</button>
			</div>
		</div>
	);
};

export default RegisterForm;
