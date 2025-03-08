"use client";

import { AuthFormProps, LoginProps } from "@/types";
import { useState } from "react";
import { useFormValidation } from "@/hooks/useFormValidation";
import { submitLoginForm } from "@/utils/authSubmit";
import LoginFormFields from "./LoginFormFields";
import FormSubmitSection from "./FormSubmitSection";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

const initialFormData: LoginProps = {
	email: "",
	password: "",
};

const LoginForm: React.FC<AuthFormProps> = ({ changeForm }) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const router = useRouter();
	const { syncCartWithDatabase } = useCart();

	const {
		formData,
		errors,
		setErrors,
		touched,
		isSubmitting,
		setIsSubmitting,
		submitError,
		setSubmitError,
		handleChange,
		handleBlur,
		validateForm,
	} = useFormValidation<LoginProps>(initialFormData);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validate all fields
		const isValid = validateForm(["email", "password"]);

		if (isValid) {
			console.log("Form submitted:", formData);

			try {
				setIsSubmitting(true);
				setSubmitError(null);

				const responseData = await submitLoginForm(formData);

				console.log("Login successful:", responseData);
				window.dispatchEvent(new Event("authChange"));

				// Sync the guest cart with the user's server cart if login was successful
				if (responseData.userId) {
					try {
						await syncCartWithDatabase();
						console.log("Cart synchronized successfully");
					} catch (syncError) {
						console.error("Error synchronizing cart:", syncError);
					}
				}

				router.push("/products");
			} catch (error) {
				console.error("Login failed:", error);

				// Handle specific error cases
				function isErrorWithField(
					error: unknown
				): error is { field: string; message: string } {
					return (
						typeof error === "object" &&
						error !== null &&
						"field" in error &&
						"message" in error &&
						typeof (error as any).field === "string" &&
						typeof (error as any).message === "string"
					);
				}

				if (
					typeof error === "object" &&
					error !== null &&
					"status" in error &&
					error.status === 409
				) {
					if (isErrorWithField(error)) {
						setErrors((prev) => ({
							...prev,
							[error.field]: error.message,
						}));
					}
				} else {
					setSubmitError(
						error instanceof Error
							? error.message
							: "Wystąpił błąd podczas logowania"
					);
				}
			} finally {
				setIsSubmitting(false);
			}
		}
	};

	return (
		<div className="flex flex-col items-center justify-center px-8 md:px-20 w-full">
			<h2 className="text-3xl font-bold mb-6 text-center">Zaloguj się</h2>
			<form
				onSubmit={handleSubmit}
				className="space-y-4 w-full flex flex-col items-center"
			>
				<LoginFormFields
					formData={formData}
					errors={errors}
					touched={touched}
					handleChange={handleChange}
					handleBlur={handleBlur}
					showPassword={showPassword}
					setShowPassword={setShowPassword}
				/>

				{/* Submit error message */}
				{submitError && (
					<div className="w-full text-red-500 text-sm mt-2">
						{submitError}
					</div>
				)}

				<FormSubmitSection
					buttonText="Zaloguj się"
					isSubmitting={isSubmitting}
					loadingText="Przetwarzanie..."
				/>
			</form>
			<div className="mt-12">
				<span>Nie posiadasz konta?</span>
				<button
					onClick={changeForm}
					className="ml-2 underline font-semibold cursor-pointer"
				>
					Zarejestruj się
				</button>
			</div>
		</div>
	);
};

export default LoginForm;
