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

export interface PasswordInputProps extends Omit<InputFieldProps, "type"> {
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

export interface ProductWithoutDetailsProps {
	id: number;
	name: string;
	description: string;
	price: number;
	imagePath: string;
	isDiscounted: boolean;
	discountPercent: number;
}

export interface SearchResult {
	id: number;
	name: string;
	price: number;
	imagePath: string;
	categoryId: string;
}

export interface CartItem {
	id: number;
	productId: number;
	quantity: number;
	product: ProductWithoutDetailsProps;
}

export interface CartItemToAddProps {
	productId: number;
	quantity: number;
}

export interface CartContextProps {
	items: CartItem[];
	totalItems: number;
	totalPrice: number;
	setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
	addItem: (item: CartItem) => Promise<void>;
	removeItem: (id: number) => Promise<void>;
	clearCart: () => Promise<void>;
	updateQuantity: (id: number, quantity: number) => Promise<void>;
	syncCartWithDatabase: () => Promise<void>;
}

export type FieldError = {
	field: string;
	message: string;
};
