import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
  const navigate = useNavigate();
  
  // Admin state
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Products state
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  
  // Product form state
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stockQuantity: '',
    imageFile: null,
    imageUrl: ''
  });
  
  // Check if user is admin
  useEffect(() => {
    const checkAdmin = () => {
      try {
        // Get user data from localStorage
        const userData = localStorage.getItem('user');
        
        if (!userData) {
          // Redirect to login if not logged in
          navigate('/login', { state: { from: '/admin' } });
          return;
        }
        
        const user = JSON.parse(userData);
        
        // Check if user is admin
        if (user.role !== 'admin') {
          // Redirect to home if not admin
          navigate('/', { 
            state: { 
              error: 'Unauthorized access. Admin privileges required.' 
            } 
          });
          return;
        }
        
        setUser(user);
        setIsLoading(false);
      } catch (err) {
        console.error('Error checking admin status:', err);
        setError('Failed to verify admin privileges');
        setIsLoading(false);
      }
    };
    
    checkAdmin();
  }, [navigate]);
  
  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // In a real app, you would fetch from your API
        // const response = await fetch('/api/products');
        // const data = await response.json();
        
        // For demo purposes, let's create some mock products
        const mockProducts = [
          {
            id: 'p1',
            name: 'Handmade Ceramic Mug',
            price: 24.99,
            description: 'Hand-thrown ceramic mug with a natural glaze finish. Each piece is unique and made with love.',
            category: 'Kitchen',
            stockQuantity: 15,
            imageUrl: '/images/products/ceramic-mug.jpg'
          },
          {
            id: 'p2',
            name: 'Macrame Wall Hanging',
            price: 39.99,
            description: 'Beautiful hand-knotted macrame wall hanging made with 100% cotton rope. Perfect for adding texture to any room.',
            category: 'Home Decor',
            stockQuantity: 8,
            imageUrl: '/images/products/macrame.jpg'
          },
          {
            id: 'p3',
            name: 'Handcrafted Wooden Bowl',
            price: 34.99,
            description: 'Artisan wooden bowl carved from a single piece of sustainable hardwood. Food-safe finish.',
            category: 'Kitchen',
            stockQuantity: 5,
            imageUrl: '/images/products/wooden-bowl.jpg'
          },
          {
            id: 'p4',
            name: 'Hand-knitted Scarf',
            price: 29.99,
            description: 'Soft and warm scarf knitted with premium merino wool. Available in multiple colors.',
            category: 'Accessories',
            stockQuantity: 12,
            imageUrl: '/images/products/knitted-scarf.jpg'
          },
          {
            id: 'p5',
            name: 'Artisan Candle Set',
            price: 49.99,
            description: 'Set of three hand-poured soy wax candles in handmade ceramic containers. Long-burning and naturally scented.',
            category: 'Home Decor',
            stockQuantity: 0, // Out of stock
            imageUrl: '/images/products/candle-set.jpg'
          }
        ];
        
        // Set mock products
        setProducts(mockProducts);
        setIsLoading(false);
        
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [user]);
  
  // Handle product form change
  const handleProductFormChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      // Handle file input
      setProductForm({
        ...productForm,
        imageFile: files[0],
        imageUrl: files[0] ? URL.createObjectURL(files[0]) : ''
      });
    } else if (type === 'number') {
      // Handle number inputs
      setProductForm({
        ...productForm,
        [name]: value !== '' ? parseFloat(value) : ''
      });
    } else {
      // Handle text inputs
      setProductForm({
        ...productForm,
        [name]: value
      });
    }
  };
  
  // Handle add new product
  const handleAddProduct = () => {
    setIsEditing(false);
    setSelectedProduct(null);
    setProductForm({
      name: '',
      price: '',
      description: '',
      category: '',
      stockQuantity: '',
      imageFile: null,
      imageUrl: ''
    });
  };
  
  // Handle edit product
  const handleEditProduct = (product) => {
    setIsEditing(true);
    setSelectedProduct(product);
    setProductForm({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      stockQuantity: product.stockQuantity,
      imageFile: null,
      imageUrl: product.imageUrl
    });
  };
  
  // Handle delete product
  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // In a real app, you would send a DELETE request to your API
      // await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      
      // Filter out the deleted product
      setProducts(products.filter(product => product.id !== productId));
      
      // Clear form if the deleted product was selected
      if (selectedProduct && selectedProduct.id === productId) {
        handleAddProduct();
      }
    }
  };
  
  // Handle form submission
  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!productForm.name || !productForm.price) {
      alert('Please fill in all required fields.');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Create product data
      const productData = {
        name: productForm.name,
        price: parseFloat(productForm.price),
        description: productForm.description,
        category: productForm.category,
        stockQuantity: parseInt(productForm.stockQuantity) || 0
      };
      
      if (isEditing) {
        // In a real app, you would send a PUT request to your API
        // const response = await fetch(`/api/products/${selectedProduct.id}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(productData)
        // });
        
        // For demo purposes, update the product in the local state
        setProducts(products.map(product => 
          product.id === selectedProduct.id 
            ? { 
                ...product, 
                ...productData,
                imageUrl: productForm.imageFile 
                  ? productForm.imageUrl // Use the new image URL if a file was selected
                  : product.imageUrl // Keep the existing image URL
              } 
            : product
        ));
        
        alert('Product updated successfully!');
      } else {
        // In a real app, you would upload the image to Azure Blob Storage
        // and get back a URL, then send the product data with the image URL
        // to your API
        
        // For demo purposes, create a new product with a generated ID
        const newProduct = {
          id: 'p' + (Math.floor(Math.random() * 1000) + 10),
          ...productData,
          imageUrl: productForm.imageUrl || '/placeholder-image.jpg'
        };
        
        // Add the new product to the local state
        setProducts([...products, newProduct]);
        
        alert('Product added successfully!');
      }
      
      // Reset form
      handleAddProduct();
      
    } catch (err) {
      console.error('Error saving product:', err);
      alert('Failed to save product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    // Redirect to login
    navigate('/login');
  };
  
  if (isLoading && !user) {
    return <div className="loading-container">Verifying admin access...</div>;
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
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className="admin-header">
          <h2>Admin Panel</h2>
          <p>{user?.name || 'Admin'}</p>
        </div>
        
        <nav className="admin-nav">
          <button 
            className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          
          <button 
            className="nav-item logout"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </nav>
      </div>
      
      <div className="admin-content">
        {activeTab === 'products' && (
          <div className="products-section">
            <div className="section-header">
              <h1>Product Management</h1>
              <button className="add-new-btn" onClick={handleAddProduct}>
                Add New Product
              </button>
            </div>
            
            <div className="products-container">
              <div className="products-list">
                <div className="product-list-header">
                  <div className="product-header-item">Image</div>
                  <div className="product-header-item">Name</div>
                  <div className="product-header-item">Price</div>
                  <div className="product-header-item">Category</div>
                  <div className="product-header-item">Stock</div>
                  <div className="product-header-item">Actions</div>
                </div>
                
                {products.length === 0 ? (
                  <div className="no-products">No products found</div>
                ) : (
                  products.map(product => (
                    <div key={product.id} className="product-list-item">
                      <div className="product-item-image">
                        <img 
                          src={product.imageUrl || '/placeholder-image.jpg'} 
                          alt={product.name} 
                        />
                      </div>
                      
                      <div className="product-item-name">
                        {product.name}
                      </div>
                      
                      <div className="product-item-price">
                        ${product.price.toFixed(2)}
                      </div>
                      
                      <div className="product-item-category">
                        {product.category}
                      </div>
                      
                      <div className="product-item-stock">
                        {product.stockQuantity > 0 ? (
                          product.stockQuantity
                        ) : (
                          <span className="out-of-stock">Out of Stock</span>
                        )}
                      </div>
                      
                      <div className="product-item-actions">
                        <button 
                          className="edit-btn"
                          onClick={() => handleEditProduct(product)}
                        >
                          Edit
                        </button>
                        
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="product-form-container">
                <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
                
                <form className="product-form" onSubmit={handleSubmitProduct}>
                  <div className="form-group">
                    <label htmlFor="name">Product Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={productForm.name}
                      onChange={handleProductFormChange}
                      required
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="price">Price ($) *</label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={productForm.price}
                        onChange={handleProductFormChange}
                        step="0.01"
                        min="0"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="category">Category</label>
                      <select
                        id="category"
                        name="category"
                        value={productForm.category}
                        onChange={handleProductFormChange}
                      >
                        <option value="">Select Category</option>
                        <option value="Kitchen">Kitchen</option>
                        <option value="Home Decor">Home Decor</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Jewelry">Jewelry</option>
                        <option value="Art">Art</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={productForm.description}
                      onChange={handleProductFormChange}
                      rows="4"
                    ></textarea>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="stockQuantity">Stock Quantity</label>
                    <input
                      type="number"
                      id="stockQuantity"
                      name="stockQuantity"
                      value={productForm.stockQuantity}
                      onChange={handleProductFormChange}
                      min="0"
                      step="1"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="image">Product Image</label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleProductFormChange}
                      accept="image/*"
                    />
                    
                    {productForm.imageUrl && (
                      <div className="image-preview">
                        <img 
                          src={productForm.imageUrl} 
                          alt="Product preview" 
                        />
                      </div>
                    )}
                    
                    <div className="image-upload-note">
                      Note: Images will be stored in Azure Blob Storage
                    </div>
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      type="button" 
                      className="cancel-btn"
                      onClick={handleAddProduct}
                    >
                      Cancel
                    </button>
                    
                    <button type="submit" className="save-btn">
                      {isEditing ? 'Update Product' : 'Add Product'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'orders' && (
          <div className="orders-section">
            <h1>Order Management</h1>
            <p>Order management functionality will be implemented here.</p>
          </div>
        )}
        
        {activeTab === 'users' && (
          <div className="users-section">
            <h1>User Management</h1>
            <p>User management functionality will be implemented here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;