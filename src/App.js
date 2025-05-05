import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import './index.css';

// Import placeholder pages
const Products = () => <div className="placeholder-page"><h1>Products Page</h1><p>Coming soon...</p></div>;
const ProductDetails = () => <div className="placeholder-page"><h1>Product Details</h1><p>Coming soon...</p></div>;
const Cart = () => <div className="placeholder-page"><h1>Shopping Cart</h1><p>Coming soon...</p></div>;
const Checkout = () => <div className="placeholder-page"><h1>Checkout</h1><p>Coming soon...</p></div>;
const Login = () => <div className="placeholder-page"><h1>Login</h1><p>Coming soon...</p></div>;
const Register = () => <div className="placeholder-page"><h1>Register</h1><p>Coming soon...</p></div>;
const About = () => <div className="placeholder-page"><h1>About Us</h1><p>Coming soon...</p></div>;
const Contact = () => <div className="placeholder-page"><h1>Contact Us</h1><p>Coming soon...</p></div>;
const NotFound = () => <div className="placeholder-page"><h1>404 - Page Not Found</h1><p>The page you are looking for doesn't exist.</p></div>;

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;