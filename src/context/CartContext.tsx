import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// 1. Define the Cart Item type
export type CartItem = {
  name: string;
  price: number;
  quantity: number;
  // Add other properties as needed
};

// 2. Define the Cart Context type
type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (itemName: string) => void;
  updateQuantity: (itemName: string, newQuantity: number) => void;
  clearCart: () => void;
};

// 3. Create the context with an initial undefined value
const CartContext = createContext<CartContextType | undefined>(undefined);

// 4. Define provider props type
type CartProviderProps = {
  children: ReactNode;
};

// 5. CartProvider implementation
export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.name === item.name);
      if (existingItem) {
        return prevItems.map(i =>
          i.name === item.name
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemName: string) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.name === itemName);
      if (existingItem && existingItem.quantity === 1) {
        return prevItems.filter(i => i.name !== itemName);
      }
      return prevItems.map(i =>
        i.name === itemName
          ? { ...i, quantity: i.quantity - 1 }
          : i
      );
    });
  };

  const updateQuantity = (itemName: string, newQuantity: number) => {
    if (newQuantity < 1) {
      setCartItems(prevItems => prevItems.filter(i => i.name !== itemName));
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(i =>
        i.name === itemName
          ? { ...i, quantity: newQuantity }
          : i
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

// 6. Custom hook for using the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
