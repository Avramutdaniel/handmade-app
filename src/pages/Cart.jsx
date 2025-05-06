import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  
  // For debugging
  useEffect(() => {
    console.log('Cart component mounted, cart state:', cart);
  }, [cart]);
  
  // Extract cart data
  const { items = [], total = 0, shipping = 0, tax = 0, grandTotal = 0 } = cart;
  
  // Handle quantity change
  const handleQuantityChange = (productId, event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      console.log('Updating quantity for:', productId, 'to:', newQuantity);
      updateQuantity(productId, newQuantity);
    }
  };
  
  // Handle item removal
  const handleRemoveItem = (productId) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      console.log('Removing item:', productId);
      removeFromCart(productId);
    }
  };
  
  // Clear entire cart
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      console.log('Clearing cart');
      clearCart();
    }
  };
  
  // Proceed to checkout
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  // If cart is empty
  if (!items || items.length === 0) {
    return (
      <div className="empty-cart-container">
        <div className="empty-cart-message">
          <h2>Your Shopping Cart is Empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      
      <div className="cart-content">
        <div className="cart-items">
          <div className="cart-header">
            <div className="cart-header-product">Product</div>
            <div className="cart-header-price">Price</div>
            <div className="cart-header-quantity">Quantity</div>
            <div className="cart-header-total">Total</div>
            <div className="cart-header-actions">Actions</div>
          </div>
          
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-product">
                <img 
                  src={item.imageUrl || 'https://placehold.co/100x100/e2d8c8/776b5d?text=Product'} 
                  alt={item.name} 
                  className="cart-item-image" 
                />
                <div className="cart-item-details">
                  <Link to={`/product/${item.id}`} className="cart-item-name">
                    {item.name}
                  </Link>
                  {item.variant && (
                    <span className="cart-item-variant">{item.variant}</span>
                  )}
                </div>
              </div>
              
              <div className="cart-item-price">
                ${item.price.toFixed(2)}
              </div>
              
              <div className="cart-item-quantity">
                <input 
                  type="number" 
                  min="1" 
                  max={item.stockQuantity || 99} 
                  value={item.quantity} 
                  onChange={(e) => handleQuantityChange(item.id, e)} 
                  className="quantity-input"
                />
              </div>
              
              <div className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              
              <div className="cart-item-actions">
                <button 
                  className="remove-item-btn"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          
          <div className="cart-actions">
            <button className="clear-cart-btn" onClick={handleClearCart}>
              Clear Cart
            </button>
            <Link to="/" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
        
        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping:</span>
            <span>
              {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
              {total > 0 && total < 50 && (
                <div className="shipping-note">
                  Add ${(50 - total).toFixed(2)} more to get free shipping
                </div>
              )}
            </span>
          </div>
          
          <div className="summary-row">
            <span>Tax (7%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          
          <div className="summary-row total">
            <span>Total:</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
          
          <button 
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={items.length === 0}
          >
            Proceed to Checkout
          </button>
          
          <div className="payment-methods">
            <p>We Accept:</p>
            <div className="payment-icons">
              <span className="payment-icon">💳</span>
              <span className="payment-icon">💰</span>
              <span className="payment-icon">🏦</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;