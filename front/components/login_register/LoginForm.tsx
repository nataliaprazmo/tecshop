// "use client";

// import { AuthFormProps, FormErrors, LoginProps } from "@/types";
// import PasswordInput from "../ui/PasswordInput";
// import { useState } from "react";
// import InputField from "../ui/InputField";
// import { Button } from "../ui/Button";
// import { useSyncCartAfterLogin } from "@/context/CartContext";
// import { Loader } from "react-feather";

// const LoginForm:React.FC<AuthFormProps>=({changeForm})=>{
//     const syncCart = useSyncCartAfterLogin();
//     const [formData, setFormData] = useState<LoginProps>({
//             email: '',
//             password: ''
//           });
    
//         const [errors, setErrors] = useState<FormErrors>({});
//         const [touched, setTouched] = useState<Record<string, boolean>>({});
//         const [showPassword, setShowPassword] = useState<boolean>(false);
//         const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//         const [submitError, setSubmitError] = useState<string | null>(null);
      
//         // Validation functions
//         const validateEmail = (email: string): string | undefined => {
//           if (!email.trim()) return 'Adres email jest wymagany';
//           const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//           if (!emailRegex.test(email)) return 'Email musi zawierać @ oraz nazwę domeny po znaku .';
//           return undefined;
//         };
      
//         const validatePassword = (password: string): string | undefined => {
//           if (!password) return 'Hasło jest wymagane';
//           if (password.length < 8) return 'Hasło musi mieć co najmniej 8 znaków';
//           return undefined;
//         };
      
//         const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//           const { name, value } = e.target;
//           setFormData((prev) => ({ ...prev, [name]: value }));
          
//           // Validate on change if the field has been touched
//           if (touched[name]) {
//             validateField(name, value);
//           }
//         };
      
//         const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
//           const { name, value } = e.target;
//           setTouched((prev) => ({ ...prev, [name]: true }));
//           validateField(name, value);
//         };
      
//         const validateField = (name: string, value: string) => {
//           let error: string | undefined;
      
//           switch (name) {
//             case 'email':
//               error = validateEmail(value);
//               break;
//             case 'password':
//               error = validatePassword(value);
//               break;
//             default:
//               break;
//           }
      
//           setErrors(prev => ({ ...prev, [name]: error }));
//           return error;
//         };
      
//         const handleSubmit = async (e: React.FormEvent) => {
//           e.preventDefault();
          
//           // Touch all fields
//           const allTouched = Object.keys(formData).reduce((acc, key) => {
//             acc[key] = true;
//             return acc;
//           }, {} as Record<string, boolean>);
          
//           setTouched(allTouched);
          
//           // Validate all fields
//           const newErrors: FormErrors = {};
//           newErrors.email = validateEmail(formData.email);
//           newErrors.password = validatePassword(formData.password);
          
//           setErrors(newErrors);
          
//           // Check if there are any errors
//           const hasErrors = Object.values(newErrors).some(error => error !== undefined);
          
//           if (!hasErrors) {
//             // Form is valid, proceed with submission
//             console.log('Form submitted:', formData);
//             try {
//               setIsSubmitting(true);
//               setSubmitError(null);
//               const response = await fetch('http://localhost:5000/api/login', {
//                 method: 'POST',
//                 headers: {
//                   'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                   email: formData.email,
//                   password: formData.password
//                 })
//               });
              
//               const responseData = await response.json();
//               if (response.status === 409) {
//                 const { message: error } = responseData;
//                 const errorField = error.includes("email")
//                   ? "email"
//                   : "password";
//                 setErrors((prev) => ({
//                   ...prev,
//                   [errorField]: error,
//                 }));
//                 return;
//               }
//               if (response.status !== 200) {
//                 setSubmitError(responseData.message || "Logowanie nie powiodło się");
//                 return;
//               }
//               console.log('Login successful:', responseData);
//               if (responseData.userId) {
//                 await syncCart(responseData.userId);
//               }

//             } catch (error) {
//               console.error('Login failed:', error);
//               setSubmitError(error instanceof Error ? error.message : 'Wystąpił błąd podczas logowania');
//             } finally {
//               setIsSubmitting(false);
//             }
//           }
//         };
//     return <div className="flex flex-col items-center justify-center px-8 md:px-20 w-full">
//     <h2 className="text-3xl font-bold mb-6 text-center">Zaloguj się</h2>
//     <form onSubmit={handleSubmit} className="space-y-4 w-full flex flex-col items-center">
//       {/* Email Input */}
//       <InputField
//         id="email"
//         name="email"
//         type="email"
//         placeholder="Adres email"
//         value={formData.email}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         error={errors.email}
//         touched={!!touched.email}
//         helperText="Email musi zawierać @ oraz nazwę domeny po znaku ."
//       />

//       {/* Password Input */}
//       <PasswordInput
//         id="password"
//         name="password"
//         placeholder="Hasło"
//         value={formData.password}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         error={errors.password}
//         touched={!!touched.password}
//         showPassword={showPassword}
//         toggleShowPassword={() => setShowPassword(!showPassword)}
//       />
//       {submitError && (
//             <div className="w-full text-red-500 text-sm mt-2">{submitError}</div>
//           )}
//       {/* Submit Button */}
//       <Button type="submit" disabled={isSubmitting}>
//                 {isSubmitting ? (
//                     <div className="flex items-center gap-2">
//                       <Loader className="animate-spin" size={16} />
//                       <span>Przetwarzanie...</span>
//                     </div>
//                   ) : (
//                     'Zaloguj się'
//                   )}
//       </Button>
//     </form>
//     <div className="mt-12">
//         <span>Nie posiadasz konta?</span>
//         <button onClick={changeForm} className="ml-2 underline font-semibold cursor-pointer">Zarejestruj się</button>
//     </div>
// </div>
// }

// export default LoginForm;

"use client";

import { AuthFormProps, LoginProps } from "@/types";
import { useState } from "react";
import { useFormValidation } from "@/hooks/useFormValidation";
import { submitLoginForm } from "@/utils/authSubmit";
import { useSyncCartAfterLogin } from "@/context/CartContext";
import LoginFormFields from "./LoginFormFields";
import FormSubmitSection from "./FormSubmitSection";
import { useRouter } from "next/navigation";

const initialFormData: LoginProps = {
  email: '',
  password: ''
};

const LoginForm: React.FC<AuthFormProps> = ({ changeForm }) => {
  const syncCart = useSyncCartAfterLogin();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  
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
    validateForm
  } = useFormValidation<LoginProps>(initialFormData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const isValid = validateForm(['email', 'password']);
    
    if (isValid) {
      console.log('Form submitted:', formData);
      
      try {
        setIsSubmitting(true);
        setSubmitError(null);
        
        const responseData = await submitLoginForm(formData);
        
        console.log('Login successful:', responseData);
        
        // Sync the guest cart with the user's server cart if login was successful
        if (responseData.userId) {
          await syncCart(responseData.userId);
        }
        
        router.push("/products");
        
      } catch (error) {
        console.error('Login failed:', error);
        
        // Handle specific error cases
        function isErrorWithField(error: unknown): error is { field: string; message: string } {
          return (
            typeof error === 'object' &&
            error !== null &&
            'field' in error &&
            'message' in error &&
            typeof (error as any).field === 'string' &&
            typeof (error as any).message === 'string'
          );
        }
      
        if (typeof error === 'object' && error !== null && 'status' in error && error.status === 409) {
          if (isErrorWithField(error)) {
            setErrors(prev => ({ ...prev, [error.field]: error.message }));
          }
        } else {
          setSubmitError(error instanceof Error ? error.message : 'Wystąpił błąd podczas logowania');
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-8 md:px-20 w-full">
      <h2 className="text-3xl font-bold mb-6 text-center">Zaloguj się</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-full flex flex-col items-center">
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
          <div className="w-full text-red-500 text-sm mt-2">{submitError}</div>
        )}
        
        <FormSubmitSection
          buttonText="Zaloguj się"
          isSubmitting={isSubmitting}
          loadingText="Przetwarzanie..."
        />
      </form>
      <div className="mt-12">
        <span>Nie posiadasz konta?</span>
        <button onClick={changeForm} className="ml-2 underline font-semibold cursor-pointer">
          Zarejestruj się
        </button>
      </div>
    </div>
  );
};

export default LoginForm;