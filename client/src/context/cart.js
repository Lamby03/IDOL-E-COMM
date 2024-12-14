import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let exisitingCartItem = localStorage.getItem('cart')
    console.log(JSON.parse(exisitingCartItem),'barabar');
    
    if(exisitingCartItem) {
      const parsedCartItem = JSON.parse(exisitingCartItem);
    
      console.log('parsedCartItem: ', parsedCartItem);


      setCart(parsedCartItem)
    }
  },[])
  useEffect(()=>{
console.log(Array.isArray(cart),'final cart');

  },[cart])
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
