import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

const removeFromCart = (itemId) => {
  setCartItems((prev) => {
    const newCart = { ...prev };

    if (!newCart[itemId]) return prev;

    newCart[itemId] -= 1;

    if (newCart[itemId] <= 0) {
      delete newCart[itemId];  // Important: remove the key when count is zero
    }

    return newCart;
  });
};



  useEffect(()=>{
    console.log(cartItems);
    
  },[cartItems])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
