import React, { createContext, useState } from "react";
import all_product from "../Assests/all_product";
import axios from "axios";
export const ShopContext = createContext(null);
/* const getDefaultCart = () => {
  let cart = {};
  all_product.forEach((product) => {
    cart[product.id] = 0;
  });
  return cart;
}; */
const ShopContextProvider = (props) => {
  /* const [cartItems, setCartItem] = useState(getDefaultCart()); */
  const [cartItems, setCartItem] = useState({});

  /*   const addToCart = (itemId) => {
    setCartItem((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
    }));
  }; */
  /* 
  const addToCart = (productId) => {
    setCartItem((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[productId]) {
        newCart[productId] += 1;
      } else {
        newCart[productId] = 1;
      }
      return newCart;
    });
  }; */

  const addToCart = async (productId, quantity) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/cart",
        {
          productId,
          quantity,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      console.log("Cart updated:", response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  const removeFromCart = (itemId) => {
    setCartItem((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
