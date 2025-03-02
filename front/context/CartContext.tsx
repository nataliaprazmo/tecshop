"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Cart item interface that matches your data structure
export interface CartItem {
  id: string;
  productId: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  itemCount: number;
  isLoading: boolean;
  userId: number | null;
  cartId: number | null;
  handleUserLogin: (newUserId: number) => Promise<void>;
}

const BASE_URL = 'http://localhost:5000/api';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [cartId, setCartId] = useState<number | null>(null);
  const [guestCartSynced, setGuestCartSynced] = useState(false);

  // Check authentication status and get user ID
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/api/auth/status');
        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(data.authenticated);
          if (data.authenticated && data.userId) {
            setUserId(data.userId);
          }
        }
      } catch (error) {
        console.error('Failed to check authentication status:', error);
      }
    };

    checkAuthStatus();
  }, []);

  // Get user's cart when authenticated
  useEffect(() => {
    if (userId) {
      fetchUserCart();
    }
  }, [userId]);

  // Load initial cart data for guests
  useEffect(() => {
    const loadCart = async () => {
      if (!isAuthenticated) {
        // For guests, load from localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          try {
            setItems(JSON.parse(savedCart));
          } catch (e) {
            console.error('Error parsing cart data from localStorage', e);
            localStorage.removeItem('cart');
          }
        }
      }
    };

    loadCart();
  }, [isAuthenticated]);

  // Update item count whenever items change
  useEffect(() => {
    setItemCount(items.reduce((total, item) => total + item.quantity, 0));
    
    // Only save to localStorage for non-authenticated users
    if (!isAuthenticated) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isAuthenticated]);

  // Fetch user's cart
  const fetchUserCart = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}/cart`);
      if (response.ok) {
        const cartData = await response.json();
        setCartId(cartData.id);
        
        // If we haven't synced the guest cart yet and we now have a cart ID,
        // sync the guest cart with the server cart
        if (!guestCartSynced && cartData.id) {
          const guestItems = getGuestCartItems();
          if (guestItems.length > 0) {
            await syncGuestCartWithServer(cartData.id, guestItems);
            setGuestCartSynced(true);
          }
        }
        
        await fetchCartItems(cartData.id);
      }
    } catch (error) {
      console.error('Error fetching user cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get guest cart items from localStorage
  const getGuestCartItems = (): CartItem[] => {
    const savedCart = localStorage.getItem('cart');
    if (!savedCart) return [];
    
    try {
      return JSON.parse(savedCart);
    } catch (e) {
      console.error('Error parsing cart data from localStorage', e);
      localStorage.removeItem('cart');
      return [];
    }
  };

  // Fetch all items in a cart
  const fetchCartItems = async (cid: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/carts/${cid}/items`);
      if (response.ok) {
        const cartItems = await response.json();
        // Transform server cart items to match our CartItem interface
        const transformedItems = cartItems.map((item: any) => ({
          id: item.id.toString(),
          productId: item.productId,
          name: item.product.name,
          description: item.product.description,
          price: item.product.price,
          quantity: item.quantity,
          imageUrl: item.product.imageUrl,
        }));
        setItems(transformedItems);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add item to cart
  const addItem = async (item: CartItem) => {
    if (isAuthenticated && cartId) {
      // For authenticated users, use server API
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/cart-items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cartId: cartId,
            productId: item.productId,
            quantity: item.quantity,
          }),
        });
        
        if (response.ok) {
          // Refresh cart items
          await fetchCartItems(cartId);
        }
      } catch (error) {
        console.error('Error adding item to cart:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // For guests, update local state only
      setItems(prevItems => {
        const existingItem = prevItems.find(i => i.productId === item.productId);
        
        if (existingItem) {
          return prevItems.map(i =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
        }
        
        return [...prevItems, {
          ...item,
          id: `local-${Date.now()}-${item.productId}` // Generate a temporary ID for local items
        }];
      });
    }
  };

  // Remove item from cart
  const removeItem = async (cartItemId: string) => {
    if (isAuthenticated && cartId) {
      // For authenticated users, use server API
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/cart-items/${cartItemId}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          // Refresh cart items
          await fetchCartItems(cartId);
        }
      } catch (error) {
        console.error('Error removing item from cart:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // For guests, update local state
      setItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
    }
  };

  // Update item quantity
  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cartItemId);
      return;
    }

    if (isAuthenticated && cartId) {
      // For authenticated users, use server API
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/cart-items/${cartItemId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity }),
        });
        
        if (response.ok) {
          // Refresh cart items
          await fetchCartItems(cartId);
        }
      } catch (error) {
        console.error('Error updating item quantity:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // For guests, update local state
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === cartItemId ? { ...item, quantity } : item
        )
      );
    }
  };

  // Clear cart
  const clearCart = async () => {
    if (isAuthenticated && cartId) {
      // For authenticated users, use server API
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/carts/${cartId}/items`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setItems([]);
        }
      } catch (error) {
        console.error('Error clearing cart:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // For guests, clear local state
      setItems([]);
      localStorage.removeItem('cart');
    }
  };

  // Sync guest cart with server when user logs in
  const syncGuestCartWithServer = async (newCartId: number, guestItems: CartItem[]) => {
    if (guestItems.length === 0) return;
    
    setIsLoading(true);
    try {
      // Format guest items for the bulk API
      const cartItems = guestItems.map(item => ({
        cartId: newCartId,
        productId: item.productId,
        quantity: item.quantity
      }));
      
      console.log('Syncing guest cart items:', cartItems);
      
      // Use the bulk endpoint to add all items at once
      const response = await fetch(`${BASE_URL}/cart-items/bulk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartItems }),
      });
      
      if (response.ok) {
        console.log('Successfully synced guest cart with server');
        // Clear localStorage after successful sync
        localStorage.removeItem('cart');
      } else {
        console.error('Failed to sync guest cart with server', await response.text());
      }
    } catch (error) {
      console.error('Error syncing guest cart with server:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user login (to be called from your auth service)
  const handleUserLogin = async (newUserId: number) => {
    console.log('User logged in, syncing cart:', newUserId);
    setUserId(newUserId);
    setIsAuthenticated(true);
    
    // Get user's cart
    try {
      const response = await fetch(`${BASE_URL}/users/${newUserId}/cart`);
      if (response.ok) {
        const cartData = await response.json();
        setCartId(cartData.id);
        
        // Get guest cart items before we possibly clear them
        const guestItems = getGuestCartItems();
        
        // Sync guest cart if we have items
        if (guestItems.length > 0) {
          await syncGuestCartWithServer(cartData.id, guestItems);
          setGuestCartSynced(true);
        }
        
        // Finally, fetch the updated cart items
        await fetchCartItems(cartData.id);
      }
    } catch (error) {
      console.error('Error getting user cart after login:', error);
    }
  };

  // Open cart modal
  const openCart = () => {
    setIsOpen(true);
  };

  // Close cart modal
  const closeCart = () => {
    setIsOpen(false);
  };

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isOpen,
      openCart,
      closeCart,
      itemCount,
      isLoading,
      userId,
      cartId,
      handleUserLogin
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Export a hook that can be used to sync cart after login
export const useSyncCartAfterLogin = () => {
  const { handleUserLogin } = useCart();
  
  // Return a function that can be called when user logs in
  return async (userId: number) => {
    await handleUserLogin(userId);
  };
};