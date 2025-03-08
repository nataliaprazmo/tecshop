import { CartItem } from "@/types";
import {
	addMultipleItemsToDatabase,
	checkAuthStatus,
	getUserCartFromDatabase,
} from "./cartApi";

export const syncCartWithDatabase = async () => {
	const isAuthenticated = await checkAuthStatus();
	if (!isAuthenticated) return;

	const userDBCart = await getUserCartFromDatabase();
	const userLSCart = JSON.parse(
		localStorage.getItem("cart") || "[]"
	) as CartItem[];

	if (userDBCart.length === 0 && userLSCart.length > 0) {
		await addMultipleItemsToDatabase(userLSCart);
		return;
	}

	if (userLSCart.length === 0 && userDBCart.length > 0) {
		localStorage.setItem("cart", JSON.stringify(userDBCart));
		return;
	}

	// both userDBCart and userLSCart has items
	if (userDBCart.length > 0 && userLSCart.length > 0) {
		const dbProductIds = new Set(
			userDBCart.map((item) => item.productId.toString())
		);

		const itemsToAddToDatabase = userLSCart
			.filter((lsItem) => !dbProductIds.has(lsItem.productId.toString()))
			.map((item) => ({
				productId: item.productId,
				quantity: item.quantity,
			}));

		if (itemsToAddToDatabase.length > 0) {
			await addMultipleItemsToDatabase(itemsToAddToDatabase);
		}

		const mergedCart = userDBCart.map((dbItem) => {
			const lsItem = userLSCart.find(
				(lsItem) =>
					lsItem.productId.toString() === dbItem.productId.toString()
			);

			return lsItem
				? {
						...dbItem,
						quantity: Math.max(dbItem.quantity, lsItem.quantity),
				  }
				: dbItem;
		});

		const uniqueLSItems = userLSCart.filter(
			(lsItem) =>
				!mergedCart.some(
					(mergedItem) =>
						mergedItem.productId.toString() ===
						lsItem.productId.toString()
				)
		);

		mergedCart.push(...uniqueLSItems);
		localStorage.setItem("cart", JSON.stringify(mergedCart));
		return;
	}
};
