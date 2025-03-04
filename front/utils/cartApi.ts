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
}

export const addItemToDatabase = async (item: CartItemToAddProps): Promise<void> => {
  const response = await fetch("http://localhost:5000/api/cart-items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(item),
  });
};

export const addMultipleItemsToDatabase = async (items: CartItemToAddProps[]): Promise<void> => {
  console.log(items);
  await fetch("http://localhost:5000/api/cart-items/bulk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ items }),
  });
};

export const removeItemFromDatabase = async (cartItemId: number): Promise<void> => {
  await fetch(`http://localhost:5000/api/cart-items/${cartItemId}`, {
    method: "DELETE",
    credentials: "include",
  });
};

export const updateItemQuantityInDatabase = async (cartItemId: number, quantity: number): Promise<void> => {
  await fetch(`http://localhost:5000/api/cart-items/${cartItemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ quantity }),
  });
};

export const clearCartInDatabase = async (): Promise<void> => {
  await fetch('http://localhost:5000/api/carts/items', {
    method: "DELETE",
    credentials: "include",
  });
}

export const syncCartWithDatabase = async () => {
  const isAuthenticated = await checkAuthStatus();
  if (!isAuthenticated) return;

  const userDBCart = await getUserCartFromDatabase();
  const userLSCart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];

  if (userDBCart.length === 0 && userLSCart.length > 0) {
    // for (const item of userLSCart) {
    //   await addItemToDatabase({productId: item.productId, quantity: item.quantity});
    // }
    await addMultipleItemsToDatabase(userLSCart);
    return;
  }

  if (userLSCart.length === 0 && userDBCart.length > 0) {
    localStorage.setItem('cart', JSON.stringify(userDBCart));
    return;
  }

  // both userDBCart and userLSCart has items
  if (userDBCart.length > 0 && userLSCart.length > 0) {
    const dbProductIds = new Set(userDBCart.map(item => item.productId));
    const lsProductIds = new Set(userLSCart.map(item => item.productId));

    const itemsToAddToDatabase = userLSCart.filter(
      lsItem => !dbProductIds.has(lsItem.productId)
    );
    // for (const item of itemsToAddToDatabase) {
    //   await addItemToDatabase({productId: item.productId, quantity: item.quantity});
    // }
    await addMultipleItemsToDatabase(itemsToAddToDatabase);

    const mergedCart = userDBCart.map(dbItem => {
      const lsItem = userLSCart.find(lsItem => lsItem.productId === dbItem.productId);
      return lsItem ? { 
        ...dbItem, 
        quantity: Math.max(dbItem.quantity, lsItem.quantity) 
      } : dbItem;
    });

    const uniqueLSItems = userLSCart.filter(
      lsItem => !mergedCart.some(mergedItem => mergedItem.productId === lsItem.productId)
    );
    mergedCart.push(...uniqueLSItems);

    localStorage.setItem('cart', JSON.stringify(mergedCart));
    return;
  }

  // both are empty -- do nothing
}