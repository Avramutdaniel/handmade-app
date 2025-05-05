import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        // In a real app, replace with your actual API endpoint
        const response = await fetch(`/api/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        
        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (product && product.stockQuantity > 0) {
      // Add product to cart with selected quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      
      // Optional: Navigate to cart or show confirmation
      navigate('/cart');
    }
  };
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && product && value <= product.stockQuantity) {
      setQuantity(value);
    }
  };

  if (loading) {
    return <div className="loading-container">Loading product details...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="not-found-container">
        <h2>Product Not Found</h2>
        <p>Sorry, the product you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <div className="product-image-section">
        <img 
          src={product.imageUrl || '/placeholder-image.jpg'} 
          alt={product.name} 
          className="product-main-image" 
        />
        
        {/* Optional: Additional product images */}
        {product.additionalImages && product.additionalImages.length > 0 && (
          <div className="product-thumbnails">
            {product.additionalImages.map((imgUrl, index) => (
              <img 
                key={index}
                src={imgUrl}
                alt={`${product.name} - view ${index + 1}`}
                className="product-thumbnail"
                // Add onClick handler to switch main image if desired
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="product-info-section">
        <div className="breadcrumbs">
          <span onClick={() => navigate('/')}>Home</span> &gt; 
          {product.category && (
            <>
              <span onClick={() => navigate(`/category/${product.category}`)}>{product.category}</span> &gt; 
            </>
          )}
          <span>{product.name}</span>
        </div>
        
        <h1 className="product-title">{product.name}</h1>
        
        <div className="product-price">${product.price.toFixed(2)}</div>
        
        {product.discountPercent > 0 && (
          <div className="product-discount">
            <span className="original-price">${(product.price / (1 - product.discountPercent/100)).toFixed(2)}</span>
            <span className="discount-badge">{product.discountPercent}% OFF</span>
          </div>
        )}
        
        <div className="product-availability">
          {product.stockQuantity > 0 ? (
            <span className="in-stock">In Stock ({product.stockQuantity} available)</span>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
        </div>
        
        <div className="product-description">
          <h2>Description</h2>
          <p>{product.description}</p>
        </div>
        
        {product.features && product.features.length > 0 && (
          <div className="product-features">
            <h2>Features</h2>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        
        {product.stockQuantity > 0 && (
          <div className="product-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input 
                type="number" 
                id="quantity" 
                name="quantity" 
                min="1" 
                max={product.stockQuantity} 
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>
            
            <button 
              className="add-to-cart-button"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        )}
        
        {product.artisan && (
          <div className="artisan-info">
            <h2>About the Artisan</h2>
            <div className="artisan-details">
              <img 
                src={product.artisan.imageUrl || '/placeholder-artisan.jpg'} 
                alt={product.artisan.name} 
                className="artisan-image"
              />
              <div className="artisan-bio">
                <h3>{product.artisan.name}</h3>
                <p>{product.artisan.bio}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;