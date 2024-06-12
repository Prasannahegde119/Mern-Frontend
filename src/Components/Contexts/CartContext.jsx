import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create a new context
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0); // New state for total items

  // Function to handle quantity change
  const handleQuantityChange = (productId, change) => {
    // Find the product in the cart
    const updatedCart = cartProducts.map((product) => {
      if (product.id === productId) {
        // Calculate new quantity
        const newQuantity = Math.max(product.quantity + change, 1);
        // Update quantity
        return { ...product, quantity: newQuantity };
      }
      return product;
    });

    // Update cart with new quantity
    setCartProducts(updatedCart);
  };

  // Function to calculate total price
  const totalPrice = cartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const token = localStorage.getItem("token");

  const clearCart = async () => {
    try {
      await axios.post("https://fasiondesign.onrender.com/api/cart/clear", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }); // Make sure this endpoint exists on your backend

      // setCartProducts([]);
    } catch (error) {
      console.error("Error clearing the cart:", error);
    }
  };

  useEffect(() => {
    // Calculate total number of items in the cart
    const items = cartProducts.reduce(
      (total, product) => total + product.quantity,
      0
    );
    setTotalItems(items);
  }, [cartProducts]);

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        handleQuantityChange,
        totalPrice,
        totalItems,
        clearCart, // Add clearCart to the context value
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);
