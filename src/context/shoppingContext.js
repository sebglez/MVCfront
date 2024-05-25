// shoppingContext.js
import React, { createContext, useContext, useReducer } from "react";

const ShoppingContext = createContext();

export const useShoppingContext = () => useContext(ShoppingContext);

const initialState = {
  cart: [],
};

const shoppingReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload }],
        };
      }
    case "REMOVE_ITEM":
      const itemToRemove = state.cart.find(
        (item) => item.id === action.payload
      );
      if (itemToRemove.quantity > 1) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload),
        };
      }
    case "CLEAR":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export const ShoppingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shoppingReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
    console.log("Item added to cart:", item);
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: "REMOVE_ITEM", payload: itemId });
    console.log("Item removed from cart:", itemId);
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
    console.log("Cart cleared");
  };

  return (
    <ShoppingContext.Provider
      value={{ cart: state.cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};
