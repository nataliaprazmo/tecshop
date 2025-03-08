import { CartItem, CartItemToAddProps } from "@/types";

export const checkAuthStatus = async (): Promise<boolean> => {
	const response = await fetch("http://localhost:5000/api/authStatus", {
		method: "GET",
		credentials: "include",
	});
	const data = await response.json();
	return data.authenticated;
};

export const getUserCartFromDatabase = async (): Promise<CartItem[]> => {
	const isAuthenticated = await checkAuthStatus();
	if (!isAuthenticated) return [];

	const response = await fetch("http://localhost:5000/api/users/cart", {
		method: "GET",
		credentials: "include",
	});
	const data = await response.json();

	return data.items;
};

export const addItemToDatabase = async (
	item: CartItemToAddProps
): Promise<void> => {
	const response = await fetch("http://localhost:5000/api/cart-items", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(item),
	});
};

export const addMultipleItemsToDatabase = async (
	items: CartItemToAddProps[]
): Promise<void> => {
	await fetch("http://localhost:5000/api/cart-items/bulk", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify({ items }),
	});
};

export const removeItemFromDatabase = async (
	cartItemId: number
): Promise<void> => {
	await fetch(`http://localhost:5000/api/cart-items/${cartItemId}`, {
		method: "DELETE",
		credentials: "include",
	});
};

export const updateItemQuantityInDatabase = async (
	cartItemId: number,
	quantity: number
): Promise<void> => {
	await fetch(`http://localhost:5000/api/cart-items/${cartItemId}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify({ quantity }),
	});
};

export const clearCartInDatabase = async (): Promise<void> => {
	await fetch("http://localhost:5000/api/carts/items", {
		method: "DELETE",
		credentials: "include",
	});
};
