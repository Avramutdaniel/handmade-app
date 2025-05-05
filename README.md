# Handmade E-Commerce Store

A feature-rich e-commerce web application for browsing and purchasing handmade products, developed as a bachelor degree project.

## 📋 Project Overview

This application allows users to:
- Browse handmade products
- View detailed product information
- Add products to cart
- Complete checkout process
- Create accounts and view order history

Administrators can:
- Manage products (add, edit, delete)
- Process and update orders
- Upload product images to Azure Blob Storage

## 🛠️ Technology Stack

### Frontend
- React.js
- React Router for navigation
- Context API for state management
- CSS for styling

### Backend
- ASP.NET Core Web API
- Azure AD B2C for authentication
- SQL Server for database
- Azure Blob Storage for image storage

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- .NET 7 SDK
- Azure account (for AD B2C and Blob Storage)
- SQL Server (local or Azure)

### Installation

#### Frontend
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file with environment variables
cp .env.example .env

# Start development server
npm start
```

#### Backend
```bash
# Navigate to server directory
cd server

# Restore packages
dotnet restore

# Update database with migrations
dotnet ef database update

# Start API server
dotnet run
```

### Environment Variables

Create a `.env` file in the client directory with the following variables:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_AZURE_AD_B2C_CLIENT_ID=your_client_id
REACT_APP_AZURE_AD_B2C_TENANT=your_tenant
REACT_APP_AZURE_AD_B2C_POLICY=B2C_1_signupsignin
REACT_APP_AZURE_STORAGE_ACCOUNT_NAME=your_storage_account
```

## 📁 Project Structure

```
handmade-ecommerce/
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── contexts/       # React contexts (CartContext, AuthContext)
│       ├── pages/          # Page components
│       ├── services/       # API services
│       └── utils/          # Helper functions
├── server/                 # Backend application
│   ├── Controllers/        # API controllers
│   ├── Models/             # Data models
│   ├── Services/           # Business logic
│   ├── Middleware/         # Custom middleware
│   └── Data/               # Database context
└── README.md               # Project documentation
```

## 🔍 Core Features

### User Features
1. **Product Browsing**: View all products with category filtering
2. **Product Details**: View images, descriptions, and pricing
3. **Shopping Cart**: Add/remove items and adjust quantities
4. **Checkout**: Enter shipping and payment information
5. **User Accounts**: Register, login, and view order history
6. **Responsive Design**: Works on desktop and mobile devices

### Admin Features
1. **Product Management**: Add, edit, and delete products
2. **Image Upload**: Store product images in Azure Blob Storage
3. **Order Processing**: View and update order statuses
4. **Inventory Management**: Track stock quantities

## 📱 Page Components

### User-Facing Pages
- **Home.jsx**: Landing page with featured products
- **ProductDetails.jsx**: Detailed product view
- **Cart.jsx**: Shopping cart page
- **Checkout.jsx**: Order form and payment
- **Login.jsx** & **Register.jsx**: Authentication pages
- **UserDashboard.jsx**: Order history and profile

### Admin Pages
- **AdminPanel.jsx**: Dashboard for administrators
- **ProductManagement.jsx**: CRUD operations for products
- **OrderManagement.jsx**: Order processing interface

## 🔐 Authentication

This application uses Azure AD B2C for authentication:
- User registration and login
- Role-based access control (User/Admin)
- Secure API endpoints with JWT tokens

## 📦 Azure Blob Storage

Product images are stored in Azure Blob Storage:
- **AzureBlobService.js**: Utility for uploading and managing images
- Images are stored with unique file names
- Public access for product images
- Admin-only access for image upload/delete

## 🚢 Deployment

### Azure Deployment
1. Create Azure resources:
   - App Service
   - SQL Database
   - Storage Account
   - Azure AD B2C tenant

2. Configure CI/CD pipeline in Azure DevOps:
   - Build frontend and backend
   - Run tests
   - Deploy to Azure App Service

### Manual Deployment
1. Build the React application:
```bash
cd client
npm run build
```

2. Publish the ASP.NET Core application:
```bash
cd server
dotnet publish -c Release
```

3. Deploy to your hosting provider of choice

## 🧪 Testing

- **Unit Tests**: Testing individual components
- **Integration Tests**: Testing API endpoints
- **E2E Tests**: Testing complete user flows

To run tests:
```bash
# Frontend tests
cd client
npm test

# Backend tests
cd server
dotnet test
```

## 🔮 Future Enhancements

- Payment gateway integration (Stripe/PayPal)
- Product reviews and ratings
- Advanced search functionality
- Email notifications
- Wishlist feature
- Multi-language support

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/)
- [Azure](https://azure.microsoft.com/)
- [Azure AD B2C](https://azure.microsoft.com/en-us/services/active-directory/external-identities/b2c/)
- [Azure Blob Storage](https://azure.microsoft.com/en-us/services/storage/blobs/)