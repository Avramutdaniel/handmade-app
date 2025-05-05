import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { id, name, price, imageUrl, stockQuantity } = product;
  
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={imageUrl || '/placeholder-image.jpg'} 
          alt={name} 
          className="product-image" 
        />
        {stockQuantity === 0 && (
          <div className="out-of-stock-badge">Out of Stock</div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-price">${price.toFixed(2)}</p>
        
        <div className="product-actions">
          <Link to={`/product/${id}`} className="view-details-btn">
            View Details
          </Link>
          
          {stockQuantity > 0 && (
            <button 
              className="add-to-cart-btn"
              onClick={(e) => {
                e.preventDefault();
                // This will be implemented via the CartContext
                console.log(`Add product ${id} to cart`);
              }}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;