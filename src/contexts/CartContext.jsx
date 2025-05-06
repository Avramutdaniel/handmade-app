import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state for the cart
const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
  shipping: 0,
  tax: 0,
  grandTotal: 0
};

// Create the context
const CartContext = createContext(initialState);

// Actions for the reducer
const ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  CALCULATE_TOTALS: 'CALCULATE_TOTALS'
};

// Helper function to calculate cart totals
const calculateCartTotals = (items) => {
  console.log('Calculating totals for items:', items);
  
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate shipping cost (free shipping over $50)
  const shipping = total > 50 ? 0 : 5.99;
  
  // Calculate tax (7% for example)
  const tax = total * 0.07;
  
  // Calculate grand total
  const grandTotal = total + shipping + tax;
  
  return {
    items,
    itemCount,
    total,
    shipping,
    tax,
    grandTotal
  };
};

// Reducer function to manage cart state
const cartReducer = (state, action) => {
  console.log('Cart reducer called with action:', action.type, 'Payload:', action.payload);
  console.log('Current state:', state);
  
  switch (action.type) {
    case ACTIONS.ADD_TO_CART: {
      const newItem = action.payload;
      
      // Validate payload
      if (!newItem || !newItem.id || typeof newItem.price !== 'number') {
        console.error('Invalid cart item:', newItem);
        return state;
      }
      
      // Check if item exists in cart
      const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
      
      let updatedItems;
      
      // If item already exists in cart, update quantity
      if (existingItemIndex >= 0) {
        console.log('Item exists, updating quantity');
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + (newItem.quantity || 1)
        };
      } else {
        // Add new item to cart
        console.log('Adding new item to cart');
        // Ensure quantity is a number and has a default value of 1
        const itemWithDefaults = {
          ...newItem,
          quantity: newItem.quantity || 1
        };
        updatedItems = [...state.items, itemWithDefaults];
      }
      
      console.log('Updated items:', updatedItems);
      const newState = calculateCartTotals(updatedItems);
      console.log('New state:', newState);
      return newState;
    }
    
    case ACTIONS.REMOVE_FROM_CART: {
      const productId = action.payload;
      const updatedItems = state.items.filter(item => item.id !== productId);
      
      return calculateCartTotals(updatedItems);
    }
    
    case ACTIONS.UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // If quantity is 0 or negative, remove item from cart
        return cartReducer(state, { 
          type: ACTIONS.REMOVE_FROM_CART, 
          payload: productId 
        });
      }
      
      const updatedItems = state.items.map(item => 
        item.id === productId ? { ...item, quantity } : item
      );
      
      return calculateCartTotals(updatedItems);
    }
    
    case ACTIONS.CLEAR_CART:
      console.log('Clearing cart');
      return initialState;
      
    case ACTIONS.CALCULATE_TOTALS:
      return calculateCartTotals(state.items);
      
    default:
      console.warn('Unknown action type:', action.type);
      return state;
  }
};

// Provider component
export const CartProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    if (typeof window === 'undefined') {
      return initialState;
    }
    
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        console.log('Loaded cart from localStorage:', parsedCart);
        return parsedCart;
      }
      return initialState;
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      // If there's an error, clear localStorage to prevent future errors
      localStorage.removeItem('cart');
      return initialState;
    }
  });
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        console.log('Saving cart to localStorage:', state);
        localStorage.setItem('cart', JSON.stringify(state));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [state]);
  
  // Action creators
  const addToCart = (product) => {
    console.log('addToCart called with:', product);
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: product });
  };
  
  const removeFromCart = (productId) => {
    dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: productId });
  };
  
  const updateQuantity = (productId, quantity) => {
    dispatch({ 
      type: ACTIONS.UPDATE_QUANTITY, 
      payload: { productId, quantity }
    });
  };
  
  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
  };
  
  // Recalculate totals (useful after price changes)
  const calculateTotals = () => {
    dispatch({ type: ACTIONS.CALCULATE_TOTALS });
  };
  
  // Expose the cart state and actions
  const value = {
    cart: state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    calculateTotals
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};

export default CartContext;