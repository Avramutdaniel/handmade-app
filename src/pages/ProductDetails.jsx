import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();
  
  // State for product data
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  // State for UI feedback
  const [addedToCart, setAddedToCart] = useState(false);
  
  // State for image gallery
  const [selectedImage, setSelectedImage] = useState(0);
  
  // For debugging
  useEffect(() => {
    console.log('Cart state:', cart);
  }, [cart]);
  
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        
        // For demo purposes, we'll simulate an API call
        // In a real app, you would fetch from your API
        // const response = await fetch(`/api/products/${id}`);
        // const data = await response.json();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock product data - ensure it has all required properties
        const mockProduct = {
          id: id,
          name: 'Handcrafted Ceramic Mug',
          price: 24.99,
          description: 'This beautifully handcrafted ceramic mug is made with love and attention to detail. Each piece is unique, featuring a natural glaze finish that showcases the artistry of traditional pottery techniques. Perfect for your morning coffee or tea, this mug isn\'t just a vessel for your favorite beverage—it\'s a work of art.',
          category: 'Kitchen',
          stockQuantity: 15,
          discountPercent: 0,
          rating: 4.8,
          features: [
            'Handmade from locally sourced clay',
            'Microwave and dishwasher safe',
            'Holds 12oz of liquid',
            'Lead-free glazes used for food safety',
            'Each piece has unique variations in glaze and form'
          ],
          images: [
            'https://placehold.co/600x600/e2d8c8/776b5d?text=Ceramic+Mug',
            'https://placehold.co/600x600/e2d8c8/776b5d?text=Mug+Side+View',
            'https://placehold.co/600x600/e2d8c8/776b5d?text=Mug+Detail'
          ],
          artisan: {
            name: 'Elena Rodriguez',
            bio: 'Elena has been practicing ceramics for over 15 years. She specializes in functional pottery that combines beauty with everyday usefulness.',
            imageUrl: 'https://placehold.co/200x200/e2d8c8/776b5d?text=Elena'
          }
        };
        
        console.log('Fetched product:', mockProduct);
        setProduct(mockProduct);
        setError(null);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    // Reset state when id changes
    setQuantity(1);
    setSelectedImage(0);
    setAddedToCart(false);
    
    fetchProductDetails();
  }, [id]);

  // Handle quantity change from input
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && product && value <= product.stockQuantity) {
      setQuantity(value);
    }
  };
  
  // Handle increment/decrement quantity
  const incrementQuantity = () => {
    if (product && quantity < product.stockQuantity) {
      setQuantity(prevQuantity => prevQuantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  // Handle add to cart with explicit error handling
  const handleAddToCart = () => {
    try {
      if (!product) {
        console.error('Cannot add to cart: Product is null');
        return;
      }
      
      if (product.stockQuantity <= 0) {
        console.error('Cannot add to cart: Product out of stock');
        return;
      }
      
      // Create cart item with selected quantity
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.images?.[0] || '',
        quantity: quantity
      };
      
      console.log('Adding to cart:', cartItem);
      
      // Add to cart
      addToCart(cartItem);
      
      // Show confirmation
      setAddedToCart(true);
      
      // Reset confirmation after 3 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
      
      console.log('Successfully added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('There was an error adding this item to your cart. Please try again.');
    }
  };
  
  // Debug function to test cart
  const testAddToCart = () => {
    const testItem = {
      id: 'test-123',
      name: 'Test Product',
      price: 9.99,
      quantity: 1
    };
    console.log('Test adding to cart:', testItem);
    addToCart(testItem);
  };

  // Switch main image
  const handleImageChange = (index) => {
    setSelectedImage(index);
  };

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/products')}>Back to Products</button>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="not-found-container">
        <h2>Product Not Found</h2>
        <p>Sorry, the product you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate('/products')}>Browse Products</button>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      {/* Product Image Gallery */}
      <div className="product-image-section">
        <div className="main-image-container">
          <img 
            src={product.images[selectedImage]} 
            alt={product.name} 
            className="product-main-image" 
          />
        </div>
        
        {product.images.length > 1 && (
          <div className="product-thumbnails">
            {product.images.map((image, index) => (
              <img 
                key={index}
                src={image}
                alt={`${product.name} - view ${index + 1}`}
                className={`product-thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => handleImageChange(index)}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Product Information */}
      <div className="product-info-section">
        <div className="breadcrumbs">
          <span onClick={() => navigate('/')}>Home</span> &gt; 
          <span onClick={() => navigate('/products')}>Products</span> &gt; 
          {product.category && (
            <>
              <span onClick={() => navigate(`/category/${product.category.toLowerCase()}`)}>{product.category}</span> &gt; 
            </>
          )}
          <span>{product.name}</span>
        </div>
        
        <h1 className="product-title">{product.name}</h1>
        
        {product.rating && (
          <div className="product-rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`star ${i < Math.floor(product.rating) ? 'full' : i < product.rating ? 'half' : 'empty'}`}>
                {i < Math.floor(product.rating) ? '★' : i < product.rating ? '★' : '☆'}
              </span>
            ))}
            <span className="rating-value">({product.rating})</span>
          </div>
        )}
        
        <div className="product-price">${product.price.toFixed(2)}</div>
        
        {product.discountPercent > 0 && (
          <div className="product-discount">
            <span className="original-price">${(product.price / (1 - product.discountPercent/100)).toFixed(2)}</span>
            <span className="discount-badge">{product.discountPercent}% OFF</span>
          </div>
        )}
        
        <div className="product-availability">
          {product.stockQuantity > 0 ? (
            <span className="in-stock">✓ In Stock ({product.stockQuantity} available)</span>
          ) : (
            <span className="out-of-stock">✗ Out of Stock</span>
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
              <div className="quantity-controls">
                <button 
                  className="quantity-btn decrement"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input 
                  type="number" 
                  id="quantity" 
                  name="quantity" 
                  min="1" 
                  max={product.stockQuantity} 
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <button 
                  className="quantity-btn increment"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stockQuantity}
                >
                  +
                </button>
              </div>
            </div>
            
            <button 
              className={`add-to-cart-button ${addedToCart ? 'success' : ''}`}
              onClick={handleAddToCart}
            >
              {addedToCart ? 'Added to Cart ✓' : 'Add to Cart'}
            </button>
            
            {/* Debug button - remove in production */}
            {process.env.NODE_ENV === 'development' && (
              <button 
                className="test-button"
                onClick={testAddToCart}
                style={{ marginTop: '10px', backgroundColor: '#f0ad4e' }}
              >
                Test Add to Cart
              </button>
            )}
            
            <button className="wishlist-button">
              Add to Wishlist ♥
            </button>
          </div>
        )}
        
        {/* Cart Debug Info - Remove in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="debug-info" style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
            <h3>Cart Debug Info:</h3>
            <p>Items in cart: {cart?.items?.length || 0}</p>
            <p>Cart total: ${cart?.total?.toFixed(2) || 0}</p>
            <pre style={{ maxHeight: '100px', overflow: 'auto' }}>
              {JSON.stringify(cart, null, 2)}
            </pre>
          </div>
        )}
        
        {/* Shipping Information */}
        <div className="shipping-info">
          <h2>Shipping & Returns</h2>
          <ul className="shipping-list">
            <li>
              <span className="shipping-icon">🚚</span>
              <div className="shipping-item-content">
                <h3>Free Shipping</h3>
                <p>On orders over $50</p>
              </div>
            </li>
            <li>
              <span className="shipping-icon">🔄</span>
              <div className="shipping-item-content">
                <h3>Easy Returns</h3>
                <p>30 day return policy</p>
              </div>
            </li>
          </ul>
        </div>
        
        {/* Artisan Information */}
        {product.artisan && (
          <div className="artisan-info">
            <h2>About the Artisan</h2>
            <div className="artisan-details">
              <img 
                src={product.artisan.imageUrl} 
                alt={product.artisan.name} 
                className="artisan-image"
              />
              <div className="artisan-bio">
                <h3>{product.artisan.name}</h3>
                <p>{product.artisan.bio}</p>
                <Link className="artisan-link" to="/artisans">Meet More Artisans</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;