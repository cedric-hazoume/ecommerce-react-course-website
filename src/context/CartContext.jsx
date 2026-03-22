import { createContext, useState, useContext } from 'react';
import { getProductById } from '../data/products';

const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (productId) => {
    const existingItem = cartItems.find(item => item.id === productId);


    if (existingItem) {
      const currentQuantity = existingItem.quantity;
      const updatedCartItems = cartItems.map(item =>
        item.id === productId ?
          {
            ...item, quantity: parseInt(currentQuantity) + 1
          } :
          item
      );

      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { id: productId, quantity: 1 }]);
    }
  };

  const getCartItemsWithProducts = () => {
    return cartItems.map(item => ({
      ...item,
      product: getProductById(item.id)
    })).filter(item => item.product);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const updatedCartItems = cartItems.map(item =>
      item.id === productId ?
        {
          ...item, quantity: parseInt(quantity)
        } :
        item
    );

    setCartItems(updatedCartItems);
  };

  const getCartTotal = () => {
    const total = cartItems.reduce((total, item) => {
      const product = getProductById(item.id);
      return total + (product ? product.price * item.quantity : 0);
    },0)

    return total.toFixed(2);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return <CartContext.Provider value={{ 
    cartItems, 
    addToCart, 
    getCartItemsWithProducts, 
    removeFromCart, 
    updateQuantity,
    getCartTotal,
    clearCart
   }}>{children}</CartContext.Provider>

}

export const useCart = () => {
  const context = useContext(CartContext);

  return context;
}