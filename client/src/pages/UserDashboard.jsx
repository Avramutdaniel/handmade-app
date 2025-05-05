import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  
  // User state
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Orders state
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');
  
  // Fetch user data
  useEffect(() => {
    const fetchUserData = () => {
      try {
        // Get user data from localStorage
        const userData = localStorage.getItem('user');
        
        if (!userData) {
          // Redirect to login if not logged in
          navigate('/login', { state: { from: '/dashboard' } });
          return;
        }
        
        setUser(JSON.parse(userData));
        setIsLoading(false);
      } catch (err) {
        console.error('Error getting user data:', err);
        setError('Failed to load user data');
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [navigate]);
  
  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // In a real app, you would fetch from your API
        // const response = await fetch(`/api/orders/${user.id}`);
        // const data = await response.json();
        
        // For demo purposes, let's create some mock orders
        const mockOrders = [
          {
            id: 'ORD-123456',
            date: '2025-04-25',
            status: 'Delivered',
            total: 89.97,
            items: [
              {
                id: 'p1',
                name: 'Handmade Ceramic Mug',
                price: 24.99,
                quantity: 2,
                imageUrl: '/images/products/ceramic-mug.jpg'
              },
              {
                id: 'p3',
                name: 'Woven Wall Hanging',
                price: 39.99,
                quantity: 1,
                imageUrl: '/images/products/wall-hanging.jpg'
              }
            ]
          },
          {
            id: 'ORD-789012',
            date: '2025-04-15',
            status: 'Shipped',
            total: 124.95,
            items: [
              {
                id: 'p5',
                name: 'Handcrafted Wooden Bowl',
                price: 34.99,
                quantity: 1,
                imageUrl: '/images/products/wooden-bowl.jpg'
              },
              {
                id: 'p8',
                name: 'Hand-knitted Scarf',
                price: 29.99,
                quantity: 3,
                imageUrl: '/images/products/knitted-scarf.jpg'
              }
            ]
          },
          {
            id: 'ORD-345678',
            date: '2025-03-28',
            status: 'Processing',
            total: 149.98,
            items: [
              {
                id: 'p12',
                name: 'Artisan Candle Set',
                price: 49.99,
                quantity: 1,
                imageUrl: '/images/products/candle-set.jpg'
              },
              {
                id: 'p15',
                name: 'Handmade Leather Journal',
                price: 39.99,
                quantity: 1,
                imageUrl: '/images/products/leather-journal.jpg'
              },
              {
                id: 'p21',
                name: 'Macrame Plant Hanger',
                price: 19.99,
                quantity: 3,
                imageUrl: '/images/products/plant-hanger.jpg'
              }
            ]
          }
        ];
        
        // Set mock orders
        setOrders(mockOrders);
        setIsLoading(false);
        
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load order history');
        setIsLoading(false);
      }
    };
    
    fetchOrders();
  }, [user]);
  
  // Handle logout
  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    // Redirect to login
    navigate('/login');
  };
  
  if (isLoading) {
    return <div className="loading-container">Loading dashboard...</div>;
  }
  
  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <div className="user-profile">
          <div className="user-avatar">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="user-info">
            <h3>{user?.name || 'User'}</h3>
            <p>{user?.email || 'user@example.com'}</p>
          </div>
        </div>
        
        <nav className="dashboard-nav">
          <button 
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            My Orders
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
          
          <button 
            className="nav-item logout"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </nav>
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'orders' && (
          <div className="orders-section">
            <h1>My Orders</h1>
            
            {orders.length === 0 ? (
              <div className="no-orders">
                <p>You haven't placed any orders yet.</p>
                <Link to="/" className="shop-now-btn">Start Shopping</Link>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-info">
                        <h3>Order #{order.id}</h3>
                        <p>Placed on {new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      
                      <div className="order-status">
                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="order-items">
                      {order.items.map(item => (
                        <div key={item.id} className="order-item">
                          <img 
                            src={item.imageUrl || '/placeholder-image.jpg'} 
                            alt={item.name} 
                            className="item-image" 
                          />
                          <div className="item-details">
                            <div className="item-name">{item.name}</div>
                            <div className="item-price">${item.price.toFixed(2)} x {item.quantity}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="order-footer">
                      <div className="order-total">
                        Total: ${order.total.toFixed(2)}
                      </div>
                      
                      <button className="view-details-btn">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'profile' && (
          <div className="profile-section">
            <h1>My Profile</h1>
            
            <div className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input 
                    type="text" 
                    value={user?.name?.split(' ')[0] || ''} 
                    readOnly 
                  />
                </div>
                
                <div className="form-group">
                  <label>Last Name</label>
                  <input 
                    type="text" 
                    value={user?.name?.split(' ')[1] || ''} 
                    readOnly 
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={user?.email || ''} readOnly />
              </div>
              
              <button className="edit-profile-btn">
                Edit Profile
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="settings-section">
            <h1>Account Settings</h1>
            
            <div className="settings-card">
              <h2>Notification Preferences</h2>
              
              <div className="settings-option">
                <label>
                  <input type="checkbox" checked />
                  Order status updates
                </label>
              </div>
              
              <div className="settings-option">
                <label>
                  <input type="checkbox" checked />
                  Promotional emails
                </label>
              </div>
              
              <div className="settings-option">
                <label>
                  <input type="checkbox" />
                  Product recommendations
                </label>
              </div>
            </div>
            
            <div className="settings-card">
              <h2>Password</h2>
              <button className="change-password-btn">
                Change Password
              </button>
            </div>
            
            <div className="settings-card">
              <h2>Connected Accounts</h2>
              
              <div className="connected-account">
                <div className="account-info">
                  <span className="account-icon">G</span>
                  <span className="account-name">Google</span>
                </div>
                
                <button className="connect-btn">Connect</button>
              </div>
              
              <div className="connected-account">
                <div className="account-info">
                  <span className="account-icon">F</span>
                  <span className="account-name">Facebook</span>
                </div>
                
                <button className="connect-btn">Connect</button>
              </div>
            </div>
            
            <div className="settings-card danger-zone">
              <h2>Danger Zone</h2>
              <button className="delete-account-btn">
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;