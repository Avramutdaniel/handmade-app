import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './Home.css';

// SVG Icons
const EcoFriendlyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feature-icon-svg">
    <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/>
  </svg>
);

const UniqueItemsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feature-icon-svg">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);

const SupportArtisansIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feature-icon-svg">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);

const GiftReadyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feature-icon-svg">
    <path d="M20 12v10H4V12"/>
    <path d="M2 7h20v5H2z"/>
    <path d="M12 22V7"/>
    <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/>
    <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
  </svg>
);

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Placeholder products with real images for development
  const placeholderProducts = [
    {
      id: 1,
      name: 'Handcrafted Ceramic Mug',
      price: 24.99,
      image: 'https://images.pexels.com/photos/4207793/pexels-photo-4207793.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'home',
      rating: 4.8,
      description: 'Beautifully handcrafted ceramic mug, perfect for your morning coffee.'
    },
    {
      id: 2,
      name: 'Macramé Wall Hanging',
      price: 59.99,
      image: 'https://images.pexels.com/photos/1539581/pexels-photo-1539581.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'decor',
      rating: 4.9,
      description: 'Elegant macramé wall hanging to add warmth to any room.'
    },
    {
      id: 3,
      name: 'Hand-Knitted Wool Scarf',
      price: 42.50,
      image: 'https://images.pexels.com/photos/3689532/pexels-photo-3689532.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'clothing',
      rating: 4.7,
      description: 'Soft and warm hand-knitted wool scarf in earthy tones.'
    },
    {
      id: 4,
      name: 'Wooden Cutting Board',
      price: 38.99,
      image: 'https://images.pexels.com/photos/5502227/pexels-photo-5502227.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'kitchen',
      rating: 4.6,
      description: 'Handcrafted wooden cutting board made from sustainable materials.'
    },
    {
      id: 5,
      name: 'Botanical Soy Candle',
      price: 19.99,
      image: 'https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'home',
      rating: 4.9,
      description: 'Hand-poured soy candle with essential oils and dried botanicals.'
    },
    {
      id: 6,
      name: 'Leather Journal',
      price: 32.00,
      image: 'https://images.pexels.com/photos/825949/pexels-photo-825949.jpeg?auto=compress&cs=tinysrgb&w=600',
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

      {/* Featured Categories */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2>Featured Collections</h2>
            <p>Explore our curated selection of handmade treasures</p>
          </div>
          
          <div className="featured-categories">
            <div className="category-card">
              <div className="category-image home-decor" style={{backgroundImage: "url('https://images.pexels.com/photos/4992466/pexels-photo-4992466.jpeg?auto=compress&cs=tinysrgb&w=600')"}}></div>
              <h3>Home Decor</h3>
              <Link to="/category/decor" className="category-link">Explore</Link>
            </div>
            
            <div className="category-card">
              <div className="category-image jewelry" style={{backgroundImage: "url('https://images.pexels.com/photos/8108391/pexels-photo-8108391.jpeg?auto=compress&cs=tinysrgb&w=600')"}}></div>
              <h3>Jewelry</h3>
              <Link to="/category/jewelry" className="category-link">Explore</Link>
            </div>
            
            <div className="category-card">
              <div className="category-image kitchen" style={{backgroundImage: "url('https://images.pexels.com/photos/6996184/pexels-photo-6996184.jpeg?auto=compress&cs=tinysrgb&w=600')"}}></div>
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
          <div 
            className="story-image" 
            style={{backgroundImage: "url('https://images.pexels.com/photos/7363768/pexels-photo-7363768.jpeg?auto=compress&cs=tinysrgb&w=600')"}}>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features">
            <div className="feature-card">
              <div className="feature-icon">
                <EcoFriendlyIcon />
              </div>
              <h3>Eco-Friendly</h3>
              <p>Sustainable materials and production processes that respect our planet</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <UniqueItemsIcon />
              </div>
              <h3>Unique Items</h3>
              <p>One-of-a-kind products crafted with attention to detail</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <SupportArtisansIcon />
              </div>
              <h3>Support Artisans</h3>
              <p>Your purchase directly supports independent creators and traditional crafts</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <GiftReadyIcon />
              </div>
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