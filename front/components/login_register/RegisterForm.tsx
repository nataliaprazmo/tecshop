'use client';
import { AuthFormProps, FormData, FormErrors } from "@/types";
import { useState } from "react";
import PasswordInput from "../ui/PasswordInput";
import InputField from "../ui/InputField";
import { Button } from "../ui/Button";

const RegisterForm:React.FC<AuthFormProps>=({changeForm})=>{
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  
    // Validation functions
    const validateName = (name: string): string | undefined => {
      if (!name.trim()) return 'Imię jest wymagane';
      if (name.length < 2) return 'Imię musi mieć co najmniej 2 znaki';
      return undefined;
    };
  
    const validateEmail = (email: string): string | undefined => {
      if (!email.trim()) return 'Adres email jest wymagany';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) return 'Email musi zawierać @ oraz nazwę domeny po znaku .';
      return undefined;
    };
  
    const validatePassword = (password: string): string | undefined => {
      if (!password) return 'Hasło jest wymagane';
      if (password.length < 8) return 'Hasło musi mieć co najmniej 8 znaków';
      return undefined;
    };
  
    const validateConfirmPassword = (confirmPassword: string): string | undefined => {
      if (!confirmPassword) return 'Potwierdzenie hasła jest wymagane';
      if (confirmPassword !== formData.password) return 'Hasła nie są identyczne';
      return undefined;
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      
      // Validate on change if the field has been touched
      if (touched[name]) {
        validateField(name, value);
      }
    };
  
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      validateField(name, value);
    };
  
    const validateField = (name: string, value: string) => {
      let error: string | undefined;
  
      switch (name) {
        case 'name':
          error = validateName(value);
          break;
        case 'email':
          error = validateEmail(value);
          break;
        case 'password':
          error = validatePassword(value);
          // Also validate confirm password when password changes
          if (formData.confirmPassword) {
            const confirmError = validateConfirmPassword(formData.confirmPassword);
            setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
          }
          break;
        case 'confirmPassword':
          error = validateConfirmPassword(value);
          break;
        default:
          break;
      }
  
      setErrors(prev => ({ ...prev, [name]: error }));
      return error;
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      // Touch all fields
      const allTouched = Object.keys(formData).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as Record<string, boolean>);
      
      setTouched(allTouched);
      
      // Validate all fields
      const newErrors: FormErrors = {};
      newErrors.username = validateName(formData.username);
      newErrors.email = validateEmail(formData.email);
      newErrors.password = validatePassword(formData.password);
      newErrors.confirmPassword = validateConfirmPassword(formData.confirmPassword);
      
      setErrors(newErrors);
      
      // Check if there are any errors
      const hasErrors = Object.values(newErrors).some(error => error !== undefined);
      
      if (!hasErrors) {
        // Form is valid, proceed with submission
        console.log('Form submitted:', formData);
        // TODO: Add your API call or form submission logic here
      }
    };

    return <div className="flex flex-col items-center justify-center px-10 md:px-20 w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Zarejestruj się</h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full flex flex-col items-center">
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
  
          {/* Submit Button */}
          <Button type="submit">
            Utwórz konto
          </Button>
        </form>
        <div className="mt-12">
            <span>Posiadasz już konto?</span>
            <button onClick={changeForm} className="ml-2 underline font-semibold cursor-pointer">Zaloguj się</button>
        </div>
    </div>
}

export default RegisterForm;