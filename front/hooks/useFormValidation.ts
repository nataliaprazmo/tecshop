import { useState } from "react";
import * as validators from "@/utils/formValidation";
import { FormErrors } from "@/types";

export function useFormValidation<T extends Record<string, any>>(
	initialValues: T
) {
	const [formData, setFormData] = useState<T>(initialValues);
	const [errors, setErrors] = useState<FormErrors>({});
	const [touched, setTouched] = useState<Record<string, boolean>>({});
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [submitError, setSubmitError] = useState<string | null>(null);

	const validateField = (
		name: string,
		value: string,
		otherValues?: Record<string, any>
	) => {
		let error: string | undefined;

		switch (name) {
			case "username":
				error = validators.validateUsername(value);
				break;
			case "email":
				error = validators.validateEmail(value);
				break;
			case "password":
				error = validators.validatePassword(value);
				// Also validate confirm password when password changes
				if (otherValues?.confirmPassword) {
					const confirmError = validators.validateConfirmPassword(
						otherValues.confirmPassword,
						value
					);
					setErrors((prev) => ({
						...prev,
						confirmPassword: confirmError,
					}));
				}
				break;
			case "confirmPassword":
				error = validators.validateConfirmPassword(
					value,
					otherValues?.password || ""
				);
				break;
			default:
				break;
		}

		setErrors((prev) => ({ ...prev, [name]: error }));
		return error;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Validate on change if the field has been touched
		if (touched[name]) {
			validateField(name, value, formData);
		}
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setTouched((prev) => ({ ...prev, [name]: true }));
		validateField(name, value, formData);
	};

	const validateForm = (fields: string[]) => {
		// Touch all fields
		const allTouched = fields.reduce((acc, key) => {
			acc[key] = true;
			return acc;
		}, {} as Record<string, boolean>);

		setTouched(allTouched);

		// Validate all fields
		const newErrors: FormErrors = {};

		fields.forEach((field) => {
			const value = formData[field] as string;
			switch (field) {
				case "username":
					newErrors[field] = validators.validateUsername(value);
					break;
				case "email":
					newErrors[field] = validators.validateEmail(value);
					break;
				case "password":
					newErrors[field] = validators.validatePassword(value);
					break;
				case "confirmPassword":
					newErrors[field] = validators.validateConfirmPassword(
						value,
						formData.password as string
					);
					break;
				default:
					break;
			}
		});

		setErrors(newErrors);

		// Check if there are any errors
		return !Object.values(newErrors).some((error) => error !== undefined);
	};

	return {
		formData,
		setFormData,
		errors,
		setErrors,
		touched,
		setTouched,
		isSubmitting,
		setIsSubmitting,
		submitError,
		setSubmitError,
		validateField,
		handleChange,
		handleBlur,
		validateForm,
	};
}
