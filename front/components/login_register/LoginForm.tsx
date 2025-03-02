"use client";

import { AuthFormProps, FormErrors, LoginProps } from "@/types";
import PasswordInput from "../ui/PasswordInput";
import { useState } from "react";
import InputField from "../ui/InputField";
import { Button } from "../ui/Button";
import { useSyncCartAfterLogin } from "@/context/CartContext";

const LoginForm:React.FC<AuthFormProps>=({changeForm})=>{
    const syncCart = useSyncCartAfterLogin();
    const [formData, setFormData] = useState<LoginProps>({
            email: '',
            password: ''
          });
    
        const [errors, setErrors] = useState<FormErrors>({});
        const [touched, setTouched] = useState<Record<string, boolean>>({});
        const [showPassword, setShowPassword] = useState<boolean>(false);
      
        // Validation functions
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
            case 'email':
              error = validateEmail(value);
              break;
            case 'password':
              error = validatePassword(value);
              break;
            default:
              break;
          }
      
          setErrors(prev => ({ ...prev, [name]: error }));
          return error;
        };
      
        const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          
          // Touch all fields
          const allTouched = Object.keys(formData).reduce((acc, key) => {
            acc[key] = true;
            return acc;
          }, {} as Record<string, boolean>);
          
          setTouched(allTouched);
          
          // Validate all fields
          const newErrors: FormErrors = {};
          newErrors.email = validateEmail(formData.email);
          newErrors.password = validatePassword(formData.password);
          
          setErrors(newErrors);
          
          // Check if there are any errors
          const hasErrors = Object.values(newErrors).some(error => error !== undefined);
          
          if (!hasErrors) {
            // Form is valid, proceed with submission
            console.log('Form submitted:', formData);
            try {
              const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({formData})
              });
              
              if (response.ok) {
                const userData = await response.json();
                // Sync the guest cart with the user's server cart
                await syncCart(userData.userId);
                
                // Continue with your login flow...
              }
            } catch (error) {
              console.error('Login failed:', error);
            }
          }
        };
    return <div className="flex flex-col items-center justify-center px-8 md:px-20 w-full">
    <h2 className="text-3xl font-bold mb-6 text-center">Zaloguj się</h2>
    <form onSubmit={handleSubmit} className="space-y-4 w-full flex flex-col items-center">
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

      {/* Submit Button */}
      <Button type="submit">
        Zaloguj się
      </Button>
    </form>
    <div className="mt-12">
        <span>Nie posiadasz konta?</span>
        <button onClick={changeForm} className="ml-2 underline font-semibold cursor-pointer">Zarejestruj się</button>
    </div>
</div>
}

export default LoginForm;