import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ handleContinueShopping }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);


  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.cost * item.quantity, 0).toFixed(2);
  };


  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };


  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      handleRemove(item);
    }
  };


  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };


  const calculateTotalCost = (item) => {
    return (item.cost * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.name}>
                <span className="item-name">{item.name}</span>
                <div className="quantity-controls">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>
                <span className="item-cost">${item.cost.toFixed(2)}</span>
                <span className="item-total">${calculateTotalCost(item)}</span>
                <button onClick={() => handleRemove(item)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total Amount: ${calculateTotalAmount()}</h3>
            <button onClick={handleContinueShopping}>Continue Shopping</button>
            <button onClick={() => alert('Checkout functionality coming soon!')}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
