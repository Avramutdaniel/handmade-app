import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // In a real app, replace with your actual API endpoint
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category if needed
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  // Get unique categories for the filter
  const categories = ['all', ...new Set(products.map(product => product.category))];

  return (
    <div className="home-container">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-content">
          <h1>Handcrafted with Love</h1>
          <p>Discover unique handmade products created by talented artisans</p>
          <button className="shop-now-btn">Shop Now</button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Products Section */}
      <div className="products-section">
        <h2>Our Products</h2>
        
        {loading && <p className="loading-message">Loading products...</p>}
        
        {error && <p className="error-message">{error}</p>}
        
        {!loading && !error && filteredProducts.length === 0 && (
          <p className="no-products-message">No products found in this category.</p>
        )}
        
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Featured Section */}
      <div className="featured-section">
        <h2>Why Choose Our Handmade Products?</h2>
        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">🌿</div>
            <h3>Eco-Friendly</h3>
            <p>Sustainable materials and production processes</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Unique Items</h3>
            <p>One-of-a-kind products you won't find elsewhere</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">❤️</div>
            <h3>Support Artisans</h3>
            <p>Your purchase directly supports independent creators</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;