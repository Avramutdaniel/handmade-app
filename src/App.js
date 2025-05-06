import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound';
import { CartProvider } from './contexts/CartContext';
import './index.css';

// Import placeholder pages
const Products = () => <div className="placeholder-page"><h1>Products Page</h1><p>Coming soon...</p></div>;
const About = () => <div className="placeholder-page"><h1>About Us</h1><p>Coming soon...</p></div>;
const Contact = () => <div className="placeholder-page"><h1>Contact Us</h1><p>Coming soon...</p></div>;

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/category/:categoryName" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;