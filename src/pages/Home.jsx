import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './Home.css';
// We'll use a color gradient instead of an image to avoid path issues
// You can add the image back once file structure is properly set up

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Placeholder products for development
  const placeholderProducts = [
    {
      id: 1,
      name: 'Handcrafted Ceramic Mug',
      price: 24.99,
      image: 'https://placehold.co/300x300/e2d8c8/776b5d?text=Ceramic+Mug',
      category: 'home',
      rating: 4.8,
      description: 'Beautifully handcrafted ceramic mug, perfect for your morning coffee.'
    },
    {
      id: 2,
      name: 'Macramé Wall Hanging',
      price: 59.99,
      image: 'https://placehold.co/300x300/e2d8c8/776b5d?text=Macramé',
      category: 'decor',
      rating: 4.9,
      description: 'Elegant macramé wall hanging to add warmth to any room.'
    },
    {
      id: 3,
      name: 'Hand-Knitted Wool Scarf',
      price: 42.50,
      image: 'https://placehold.co/300x300/e2d8c8/776b5d?text=Wool+Scarf',
      category: 'clothing',
      rating: 4.7,
      description: 'Soft and warm hand-knitted wool scarf in earthy tones.'
    },
    {
      id: 4,
      name: 'Wooden Cutting Board',
      price: 38.99,
      image: 'https://placehold.co/300x300/e2d8c8/776b5d?text=Cutting+Board',
      category: 'kitchen',
      rating: 4.6,
      description: 'Handcrafted wooden cutting board made from sustainable materials.'
    },
    {
      id: 5,
      name: 'Botanical Soy Candle',
      price: 19.99,
      image: 'https://placehold.co/300x300/e2d8c8/776b5d?text=Soy+Candle',
      category: 'home',
      rating: 4.9,
      description: 'Hand-poured soy candle with essential oils and dried botanicals.'
    },
    {
      id: 6,
      name: 'Leather Journal',
      price: 32.00,
      image: 'https://placehold.co/300x300/e2d8c8/776b5d?text=Journal',
      category: 'stationery',
      rating: 4.8,
      description: 'Handcrafted leather journal with handmade paper pages.'
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Simulate an API call with setTimeout
        setTimeout(() => {
          setProducts(placeholderProducts);
          setLoading(false);
        }, 800);
        
        // In a real app, uncomment this and use your actual API endpoint
        /*
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data);
        */
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
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
          <Link to="/products" className="shop-now-btn">Shop Now</Link>
        </div>
      </div>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2>Featured Collections</h2>
            <p>Explore our curated selection of handmade treasures</p>
          </div>
          
          <div className="featured-categories">
            <div className="category-card">
              <div className="category-image home-decor"></div>
              <h3>Home Decor</h3>
              <Link to="/category/decor" className="category-link">Explore</Link>
            </div>
            
            <div className="category-card">
              <div className="category-image jewelry"></div>
              <h3>Jewelry</h3>
              <Link to="/category/jewelry" className="category-link">Explore</Link>
            </div>
            
            <div className="category-card">
              <div className="category-image kitchen"></div>
              <h3>Kitchen</h3>
              <Link to="/category/kitchen" className="category-link">Explore</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Products</h2>
            <p>Each item tells a unique story</p>
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
          
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading amazing handmade products...</p>
            </div>
          )}
          
          {error && <div className="error-message">{error}</div>}
          
          {!loading && !error && filteredProducts.length === 0 && (
            <p className="no-products-message">No products found in this category.</p>
          )}
          
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Story Section */}
      <section className="artisan-story">
        <div className="container">
          <div className="story-content">
            <h2>The Artisan's Journey</h2>
            <p>
              Every piece in our collection is handcrafted with care by skilled artisans who
              pour their heart and soul into their work. Each item tells a story of tradition,
              skill, and dedication.
            </p>
            <Link to="/about" className="story-link">Meet Our Artisans</Link>
          </div>
          <div className="story-image"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features">
            <div className="feature-card">
              <div className="feature-icon">🌿</div>
              <h3>Eco-Friendly</h3>
              <p>Sustainable materials and production processes that respect our planet</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Unique Items</h3>
              <p>One-of-a-kind products crafted with attention to detail</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">❤️</div>
              <h3>Support Artisans</h3>
              <p>Your purchase directly supports independent creators and traditional crafts</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎁</div>
              <h3>Gift Ready</h3>
              <p>Beautiful packaging makes our products perfect for gifting</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <h2>Join Our Community</h2>
          <p>Subscribe to receive updates on new products, artisan stories, and special offers</p>
          
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;