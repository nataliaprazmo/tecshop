import { CartContextProps, CartItem } from "@/types";
import { addItemToDatabase, checkAuthStatus, clearCartInDatabase, removeItemFromDatabase, syncCartWithDatabase, updateItemQuantityInDatabase } from "@/utils/cartApi";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const locatStorageintoItems = () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }

  useEffect(() => {
    locatStorageintoItems();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const syncCart = async () => {
    await syncCartWithDatabase();
  };

  const addItem = async (item: CartItem) => {
    const isAuthenticated = await checkAuthStatus();
    if (isAuthenticated) {
      await addItemToDatabase({
        productId: item.id, 
        quantity: item.quantity
      });
      await syncCart();
      locatStorageintoItems();
    } else {
      setItems((prev) => {
        const existingItem = prev.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
          return prev.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + existingItem.quantity }
              : cartItem
          );
        }
        return [...prev, { ...item, quantity: item.quantity }];
      });
    }
  };

  const removeItem = async (id: number) => {
    const isAuthenticated = await checkAuthStatus();
    if (isAuthenticated) {
      await removeItemFromDatabase(id);
      await syncCart();
      locatStorageintoItems();
    } else {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const clearCart = async () => {
    const isAuthenticated = await checkAuthStatus();
    if (isAuthenticated) {
      await clearCartInDatabase();
      await syncCart();
      locatStorageintoItems();
    } else {
      setItems([]);
    }
  };

  const updateQuantity = async (id: number, quantity: number) => {
    const isAuthenticated = await checkAuthStatus();
    if (isAuthenticated) {
      await updateItemQuantityInDatabase(id, quantity);
      await syncCart();
      locatStorageintoItems();
    } else {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

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
        syncCartWithDatabase: syncCart 
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