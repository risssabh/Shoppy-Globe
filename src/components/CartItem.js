// src/components/CartItem.js
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity
} from '../redux/cartActions';
import './CartItem.css';

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} className="cart-img" />

      <div className="cart-details">
        <h4>{item.title}</h4>
        <p>Price: ${item.price}</p>

        <div className="quantity-controls">
          <button onClick={() => dispatch(decrementQuantity(item.id))}>−</button>
          <span>{item.quantity}</span>
          <button onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
        </div>

        <button
          className="remove-btn"
          onClick={() => dispatch(removeFromCart(item.id))}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
