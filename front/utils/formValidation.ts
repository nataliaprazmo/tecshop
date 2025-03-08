export const validateUsername = (username: string): string | undefined => {
	if (!username.trim()) return "Imię jest wymagane";
	if (username.length < 2) return "Imię musi mieć co najmniej 2 znaki";
	return undefined;
};

export const validateEmail = (email: string): string | undefined => {
	if (!email.trim()) return "Adres email jest wymagany";
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email))
		return "Email musi zawierać @ oraz nazwę domeny po znaku .";
	return undefined;
};

export const validatePassword = (password: string): string | undefined => {
	if (!password) return "Hasło jest wymagane";
	if (password.length < 8) return "Hasło musi mieć co najmniej 8 znaków";
	return undefined;
};

export const validateConfirmPassword = (
	confirmPassword: string,
	password: string
): string | undefined => {
	if (!confirmPassword) return "Potwierdzenie hasła jest wymagane";
	if (confirmPassword !== password) return "Hasła nie są identyczne";
	return undefined;
};
