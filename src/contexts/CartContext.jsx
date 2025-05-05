import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state for the cart
const initialState = {
  items: [],
  total: 0,
};

// Create the context
const CartContext = createContext();

// Actions for the reducer
const ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
};

// Reducer function to manage cart state
const cartReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART: {
      const product = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === product.id);
      
      // If item already exists in cart, update quantity
      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      }
      
      // Otherwise add new item to cart
      const newItem = {
        ...product,
        quantity: 1,
      };
      
      return {
        ...state,
        items: [...state.items, newItem],
        total: calculateTotal([...state.items, newItem]),
      };
    }
    
    case ACTIONS.REMOVE_FROM_CART: {
      const productId = action.payload;
      const updatedItems = state.items.filter(item => item.id !== productId);
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
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
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }
    
    case ACTIONS.CLEAR_CART:
      return initialState;
      
    default:
      return state;
  }
};

// Helper function to calculate total price
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Provider component
export const CartProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : initialState;
  });
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);
  
  // Action creators
  const addToCart = (product) => {
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
  
  const value = {
    cart: state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
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