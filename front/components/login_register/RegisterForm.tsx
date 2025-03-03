// 'use client';
// import { AuthFormProps, FormData, FormErrors } from "@/types";
// import { useState } from "react";
// import PasswordInput from "../ui/PasswordInput";
// import InputField from "../ui/InputField";
// import { Button } from "../ui/Button";
// import { Loader } from "react-feather";

// const RegisterForm:React.FC<AuthFormProps>=({changeForm})=>{
//     const [formData, setFormData] = useState<FormData>({
//         username: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//       });

//     const [errors, setErrors] = useState<FormErrors>({});
//     const [touched, setTouched] = useState<Record<string, boolean>>({});
//     const [showPassword, setShowPassword] = useState<boolean>(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
//     const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//     const [submitError, setSubmitError] = useState<string | null>(null);
  
//     // Validation functions
//     const validateName = (username: string): string | undefined => {
//       if (!username.trim()) return 'Imię jest wymagane';
//       if (username.length < 2) return 'Imię musi mieć co najmniej 2 znaki';
//       return undefined;
//     };
  
//     const validateEmail = (email: string): string | undefined => {
//       if (!email.trim()) return 'Adres email jest wymagany';
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(email)) return 'Email musi zawierać @ oraz nazwę domeny po znaku .';
//       return undefined;
//     };
  
//     const validatePassword = (password: string): string | undefined => {
//       if (!password) return 'Hasło jest wymagane';
//       if (password.length < 8) return 'Hasło musi mieć co najmniej 8 znaków';
//       return undefined;
//     };
  
//     const validateConfirmPassword = (confirmPassword: string): string | undefined => {
//       if (!confirmPassword) return 'Potwierdzenie hasła jest wymagane';
//       if (confirmPassword !== formData.password) return 'Hasła nie są identyczne';
//       return undefined;
//     };
  
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const { name, value } = e.target;
//       setFormData((prev) => ({ ...prev, [name]: value }));
      
//       // Validate on change if the field has been touched
//       if (touched[name]) {
//         validateField(name, value);
//       }
//     };
  
//     const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
//       const { name, value } = e.target;
//       setTouched((prev) => ({ ...prev, [name]: true }));
//       validateField(name, value);
//     };
  
//     const validateField = (name: string, value: string) => {
//       let error: string | undefined;
  
//       switch (name) {
//         case 'username':
//           error = validateName(value);
//           break;
//         case 'email':
//           error = validateEmail(value);
//           break;
//         case 'password':
//           error = validatePassword(value);
//           // Also validate confirm password when password changes
//           if (formData.confirmPassword) {
//             const confirmError = validateConfirmPassword(formData.confirmPassword);
//             setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
//           }
//           break;
//         case 'confirmPassword':
//           error = validateConfirmPassword(value);
//           break;
//         default:
//           break;
//       }
  
//       setErrors(prev => ({ ...prev, [name]: error }));
//       return error;
//     };
  
//     const handleSubmit = async (e: React.FormEvent) => {
//       e.preventDefault();
      
//       // Touch all fields
//       const allTouched = Object.keys(formData).reduce((acc, key) => {
//         acc[key] = true;
//         return acc;
//       }, {} as Record<string, boolean>);
      
//       setTouched(allTouched);
      
//       // Validate all fields
//       const newErrors: FormErrors = {};
//       newErrors.username = validateName(formData.username);
//       newErrors.email = validateEmail(formData.email);
//       newErrors.password = validatePassword(formData.password);
//       newErrors.confirmPassword = validateConfirmPassword(formData.confirmPassword);
      
//       setErrors(newErrors);
      
//       // Check if there are any errors
//       const hasErrors = Object.values(newErrors).some(error => error !== undefined);
      
//       if (!hasErrors) {
//         // Form is valid, proceed with submission
//         console.log('Form submitted:', formData);
//         try{
//           setIsSubmitting(true);
//           setSubmitError(null);

//           const response = await fetch('http://localhost:5000/api/users', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               username: formData.username,
//               email: formData.email,
//               password: formData.password
//             }),
//           });

//           const data = await response.json();
          
//           if (!response.ok) {
//             throw new Error(data.message || 'Rejestracja nie powiodła się');
//           }
          
//           console.log('Registration successful:', data);
//           changeForm();
//         } catch (error) {
//           console.error('Registration error:', error);
//           setSubmitError(error instanceof Error ? error.message : 'Wystąpił błąd podczas rejestracji');
//         } finally {
//           setIsSubmitting(false);
//         }
//       }
//     };

//     return <div className="flex flex-col items-center justify-center px-10 md:px-20 w-full">
//         <h2 className="text-3xl font-bold mb-6 text-center">Zarejestruj się</h2>
//         <form onSubmit={handleSubmit} className="space-y-4 w-full flex flex-col items-center">
//             {/* Name Input */}
//           <InputField
//             id="username"
//             name="username"
//             type="text"
//             placeholder="Nazwa użytkownika"
//             value={formData.username}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             error={errors.username}
//             touched={!!touched.username}
//           />
  
//           {/* Email Input */}
//           <InputField
//             id="email"
//             name="email"
//             type="email"
//             placeholder="Adres email"
//             value={formData.email}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             error={errors.email}
//             touched={!!touched.email}
//             helperText="Email musi zawierać @ oraz nazwę domeny po znaku ."
//           />
  
//           {/* Password Input */}
//           <PasswordInput
//             id="password"
//             name="password"
//             placeholder="Hasło"
//             value={formData.password}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             error={errors.password}
//             touched={!!touched.password}
//             showPassword={showPassword}
//             toggleShowPassword={() => setShowPassword(!showPassword)}
//           />
  
//           {/* Confirm Password Input */}
//           <PasswordInput
//             id="confirmPassword"
//             name="confirmPassword"
//             placeholder="Potwierdź hasło"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             error={errors.confirmPassword}
//             touched={!!touched.confirmPassword}
//             showPassword={showConfirmPassword}
//             toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
//           />
//           {submitError && (
//             <div className="w-full text-red-500 text-sm mt-2">{submitError}</div>
//           )}
  
//           {/* Submit Button */}
//           <Button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? (
//               <div className="flex items-center gap-2">
//                 <Loader className="animate-spin" size={16} />
//                 <span>Przetwarzanie...</span>
//               </div>
//             ) : (
//               'Utwórz konto'
//             )}
//           </Button>
//         </form>
//         <div className="mt-12">
//             <span>Posiadasz już konto?</span>
//             <button onClick={changeForm} className="ml-2 underline font-semibold cursor-pointer">Zaloguj się</button>
//         </div>
//     </div>
// }

// export default RegisterForm;

'use client';

import { AuthFormProps, FormData } from "@/types";
import { useState } from "react";
import { useFormValidation } from "@/hooks/useFormValidation";
import { submitRegisterForm } from "@/utils/authSubmit";
import RegisterFormFields from "./RegisterFormFields";
import FormSubmitSection from "./FormSubmitSection";

const initialFormData: FormData = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterForm: React.FC<AuthFormProps> = ({ changeForm }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  
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
    validateForm
  } = useFormValidation<FormData>(initialFormData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const isValid = validateForm(['username', 'email', 'password', 'confirmPassword']);
    
    if (isValid) {
      console.log('Form submitted:', formData);
      
      // API call
      try {
        setIsSubmitting(true);
        setSubmitError(null);
        
        const data = await submitRegisterForm(formData);
        
        console.log('Registration successful:', data);
        changeForm(); // Redirect to login page
        
      } catch (error) {
        console.error('Registration error:', error);
        setSubmitError(error instanceof Error ? error.message : 'Wystąpił błąd podczas rejestracji');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const passwordVisibilityProps = {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword
  };

  return (
    <div className="flex flex-col items-center justify-center px-10 md:px-20 w-full">
      <h2 className="text-3xl font-bold mb-6 text-center">Zarejestruj się</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-full flex flex-col items-center">
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
          <div className="w-full text-red-500 text-sm mt-2">{submitError}</div>
        )}
        
        <FormSubmitSection
          buttonText="Utwórz konto"
          isSubmitting={isSubmitting}
          loadingText="Przetwarzanie..."
        />
      </form>
      <div className="mt-12">
        <span>Posiadasz już konto?</span>
        <button onClick={changeForm} className="ml-2 underline font-semibold cursor-pointer">
          Zaloguj się
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;