import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { id, name, price, image, rating, category } = product;
  
  // Format price with 2 decimal places
  const formattedPrice = price.toFixed(2);
  
  // Generate stars for the rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`star-${i}`} className="star full">★</span>);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<span key="half-star" className="star half">★</span>);
    }
    
    // Add empty stars to make total of 5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }
    
    return stars;
  };

  return (
    <div className="product-card">
      <div className="product-badge">{category}</div>
      
      <Link to={`/product/${id}`} className="product-image-container">
        <img src={image} alt={name} className="product-image" />
        <div className="quick-view">
          <span>Quick View</span>
        </div>
      </Link>
      
      <div className="product-details">
        <Link to={`/product/${id}`} className="product-name">{name}</Link>
        
        <div className="product-rating">
          {renderStars(rating)}
          <span className="rating-value">{rating}</span>
        </div>
        
        <div className="product-price">${formattedPrice}</div>
        
        <div className="product-actions">
          <button className="add-to-cart-btn">Add to Cart</button>
          <button className="wishlist-btn">♥</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;