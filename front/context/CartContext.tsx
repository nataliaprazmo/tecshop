import { CartContextProps, CartItem } from "@/types";
import { addItemToDatabase, checkAuthStatus, clearCartInDatabase, removeItemFromDatabase, updateItemQuantityInDatabase } from "@/utils/cartApi";
import { syncCartWithDatabase } from "@/utils/syncCartApi";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const syncLocalStorage = useCallback((newItems: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(newItems));
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    syncLocalStorage(items);
  }, [items, syncLocalStorage]);

  const performCartSync = useCallback(async () => {
    const isAuthenticated = await checkAuthStatus();
    if (isAuthenticated) {
      await syncCartWithDatabase();
    }
  }, []);

  const addItem = useCallback(async (item: CartItem) => {
    const isAuthenticated = await checkAuthStatus();

    if (isAuthenticated) {
      await addItemToDatabase({
        productId: item.id,
        quantity: item.quantity
      });
    } 
    
      setItems((prev) => {
        const existingItem = prev.find((cartItem) => cartItem.productId === item.productId);
        if (existingItem) {
          return prev.map((cartItem) =>
            cartItem.productId === item.productId
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          );
        }
        return [...prev, { ...item, quantity: item.quantity }];
      });
  }, []);

  const removeItem = useCallback(async (id: number) => {
    const isAuthenticated = await checkAuthStatus();

    if (isAuthenticated) {
      await removeItemFromDatabase(id);
    } 
    
      setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(async () => {
    const isAuthenticated = await checkAuthStatus();

    if (isAuthenticated) {
      await clearCartInDatabase();
    }
    
      setItems([]);
  }, []);

  const updateQuantity = useCallback(async (id: number, quantity: number) => {
    const isAuthenticated = await checkAuthStatus();

    if (isAuthenticated) {
      await updateItemQuantityInDatabase(id, quantity);
    }
    
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
      
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + (item.product.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
    value={{
      items,
      totalItems,
      totalPrice,
      setItems,
      addItem,
      removeItem,
      clearCart,
      updateQuantity,
      syncCartWithDatabase: performCartSync
    }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};