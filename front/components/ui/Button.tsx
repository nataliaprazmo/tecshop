import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: "primary" | "secondary" | "outline";
}

export function Button({
	children,
	variant = "primary",
	className,
	...props
}: ButtonProps) {
	const baseClasses =
		"py-2 px-6 rounded-xl font-medium transition-colors cursor-pointer";

	const variantClasses = {
		primary:
			"bg-gradient-to-r hover:bg-gradient-to-l from-primary to-secondary text-white font-bold flex gap-2 items-center",
		secondary: "bg-secondary text-white hover:bg-purple-600",
		outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
	};

	return (
		<button
			className={`${baseClasses} ${variantClasses[variant]} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}
