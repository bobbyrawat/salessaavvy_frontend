import React, { useEffect } from "react";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart
} from "../services/cartService";

import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, fetchCart } = useCart();

useEffect(() => {
  fetchCart();
}, [fetchCart]);

  const handleIncrease = (id) => {
    increaseQuantity(id).then(() => fetchCart());
  };

  const handleDecrease = (id) => {
    decreaseQuantity(id).then(() => fetchCart());
  };

  const handleRemove = (id) => {
    removeItem(id).then(() => fetchCart());
  };

  const handleClear = () => {
    clearCart().then(() => fetchCart());
  };

  if (!cart) {
    return <p className="p-6">Loading cart...</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <div key={item.productId} className="flex justify-between border p-4 mb-3">

              <div className="flex gap-4">
                <img src={item.productImage} className="w-16 h-16" />

                <div>
                  <p className="font-semibold">{item.productName}</p>
                  <p>₹{item.price}</p>
                  <p>Subtotal: ₹{item.subtotal}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => handleDecrease(item.productId)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrease(item.productId)}>+</button>

                <button
                  className="text-red-500 ml-4"
                  onClick={() => handleRemove(item.productId)}
                >
                  Remove
                </button>
              </div>

            </div>
          ))}

          <div className="mt-6 flex justify-between">
            <div>
              <p>Total Items: {cart.totalQuantity}</p>
              <p className="font-bold">Total: ₹{cart.totalAmount}</p>
            </div>

            <button
              onClick={handleClear}
              className="bg-red-500 text-white px-4 py-2"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;