export interface CategoryProps {
    name: string;
    href: string;
  }
  
export interface SalesProps {
  title: string;
  subtitle: string;
  discount: string;
  image: string;
  href: string;
}

export interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  onSale?: boolean;
}

export interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched: boolean;
  helperText?: string;
}

export interface PasswordInputProps extends Omit<InputFieldProps, 'type'> {
  showPassword: boolean;
  toggleShowPassword: () => void;
}

export interface AuthFormProps {
  changeForm: () => void;
}

export interface Category {
  name: string;
}

export interface ProductDetailsProps {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  price: number;
  imagePath: string;
  isDiscounted: boolean;
  discountPercent: number;
  details: string;
  manufacturer: string;
  model: string;
  // Optional technical specifications
  processor?: string;
  graphicsCard?: string;
  operatingSystem?: string;
  batteryLife?: string;
  screenSize?: string;
  connectivity?: string;
}