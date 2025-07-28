// src/components/Cart.js
import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import './Cart.css';

function Cart() {
  const cartItems = useSelector(state => state.cart);

  // Calculate total cost
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}

          <div className="cart-total">
            <strong>Total: ${totalPrice.toFixed(2)}</strong>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
