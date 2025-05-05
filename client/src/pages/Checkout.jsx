import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { items, total } = cart;
  
  // State for form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    paymentMethod: 'credit',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });
  
  // State for form validation
  const [errors, setErrors] = useState({});
  
  // State for order processing
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  // Calculate summary values
  const shippingCost = total > 50 ? 0 : 5.99;
  const taxRate = 0.07;
  const taxAmount = total * taxRate;
  const grandTotal = total + shippingCost + taxAmount;
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 
      'address', 'city', 'state', 'zipCode', 'country'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    // Payment method validation
    if (formData.paymentMethod === 'credit') {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\D/g, ''))) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      
      if (!formData.cardExpiry.trim()) {
        newErrors.cardExpiry = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        newErrors.cardExpiry = 'Please use MM/YY format';
      }
      
      if (!formData.cardCvv.trim()) {
        newErrors.cardCvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(formData.cardCvv)) {
        newErrors.cardCvv = 'Please enter a valid CVV';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      document.getElementsByName(firstErrorField)[0]?.focus();
      return;
    }
    
    // Check if cart is empty
    if (items.length === 0) {
      navigate('/cart');
      return;
    }
    
    try {
      setIsProcessing(true);
      
      // In a real app, you would send this data to your backend
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     customerInfo: formData,
      //     items: items,
      //     totalAmount: grandTotal
      //   })
      // });
      
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, we'll just generate a random order ID
      const randomOrderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      setOrderId(randomOrderId);
      
      // Clear the cart after successful order
      clearCart();
      
      // Set order as complete
      setOrderComplete(true);
      
    } catch (error) {
      console.error('Error processing order:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // If order is complete, show success page
  if (orderComplete) {
    return (
      <div className="order-success-container">
        <div className="order-success-content">
          <div className="success-icon">✓</div>
          <h1>Thank You for Your Order!</h1>
          <p>Your order has been placed successfully.</p>
          <p className="order-id">Order ID: {orderId}</p>
          
          <div className="order-details">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Items:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>{shippingCost === 0 ? 'Free' : `${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
          
          <p>We have sent a confirmation email to {formData.email}.</p>
          <p>You will receive another email when your order ships.</p>
          
          <button 
            className="continue-shopping-btn"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      
      <div className="checkout-content">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Contact Information</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <div className="error-message">{errors.firstName}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <div className="error-message">{errors.lastName}</div>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(123) 456-7890"
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <div className="error-message">{errors.phone}</div>}
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h2>Shipping Address</h2>
            
            <div className="form-group">
              <label htmlFor="address">Street Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={errors.address ? 'error' : ''}
              />
              {errors.address && <div className="error-message">{errors.address}</div>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && <div className="error-message">{errors.city}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="state">State/Province *</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={errors.state ? 'error' : ''}
                />
                {errors.state && <div className="error-message">{errors.state}</div>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="zipCode">ZIP/Postal Code *</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={errors.zipCode ? 'error' : ''}
                />
                {errors.zipCode && <div className="error-message">{errors.zipCode}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="country">Country *</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={errors.country ? 'error' : ''}
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="MX">Mexico</option>
                  <option value="GB">United Kingdom</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                  <option value="JP">Japan</option>
                  <option value="AU">Australia</option>
                  {/* Add more countries as needed */}
                </select>
                {errors.country && <div className="error-message">{errors.country}</div>}
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h2>Payment Information</h2>
            
            <div className="payment-methods-selection">
              <div className="payment-method">
                <input
                  type="radio"
                  id="credit"
                  name="paymentMethod"
                  value="credit"
                  checked={formData.paymentMethod === 'credit'}
                  onChange={handleInputChange}
                />
                <label htmlFor="credit">Credit / Debit Card</label>
              </div>
              
              <div className="payment-method">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === 'paypal'}
                  onChange={handleInputChange}
                />
                <label htmlFor="paypal">PayPal</label>
              </div>
            </div>
            
            {formData.paymentMethod === 'credit' && (
              <div className="credit-card-form">
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number *</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className={errors.cardNumber ? 'error' : ''}
                  />
                  {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cardExpiry">Expiry Date (MM/YY) *</label>
                    <input
                      type="text"
                      id="cardExpiry"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className={errors.cardExpiry ? 'error' : ''}
                    />
                    {errors.cardExpiry && <div className="error-message">{errors.cardExpiry}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="cardCvv">CVV *</label>
                    <input
                      type="text"
                      id="cardCvv"
                      name="cardCvv"
                      value={formData.cardCvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className={errors.cardCvv ? 'error' : ''}
                    />
                    {errors.cardCvv && <div className="error-message">{errors.cardCvv}</div>}
                  </div>
                </div>
              </div>
            )}
            
            {formData.paymentMethod === 'paypal' && (
              <div className="paypal-info">
                <p>You will be redirected to PayPal to complete your payment after reviewing your order.</p>
              </div>
            )}
          </div>
          
          <div className="order-review">
            <h2>Review Your Order</h2>
            
            <div className="order-items">
              {items.map(item => (
                <div key={item.id} className="order-item">
                  <img 
                    src={item.imageUrl || '/placeholder-image.jpg'} 
                    alt={item.name} 
                    className="item-image" 
                  />
                  <div className="item-details">
                    <div className="item-name">{item.name}</div>
                    <div className="item-price">${item.price.toFixed(2)} x {item.quantity}</div>
                  </div>
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping:</span>
                <span>
                  {shippingCost === 0 ? 'Free' : `${shippingCost.toFixed(2)}`}
                </span>
              </div>
              
              <div className="summary-row">
                <span>Tax:</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
              
              <div className="summary-row total">
                <span>Total:</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button
              type="button"
              className="back-to-cart-btn"
              onClick={() => navigate('/cart')}
            >
              Back to Cart
            </button>
            
            <button
              type="submit"
              className="place-order-btn"
              disabled={isProcessing || items.length === 0}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};