import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let exisitingCartItem = localStorage.getItem('cart')
    if(exisitingCartItem) {
      const parsedCartItem = JSON.parse(exisitingCartItem);
      delete parsedCartItem[0].photo; // Remove 'photo' field from the cart item
      console.log('parsedCartItem: ', parsedCartItem);
      setCart(parsedCartItem)
    }
  },[])
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
