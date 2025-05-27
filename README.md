# Warehouse Management Application

## 📋 Overview

A comprehensive Warehouse Management Application designed to streamline inventory control and staff management operations. This solution empowers warehouse staff and administrators with tools to efficiently track products, manage inventory levels, and handle personnel information.

## ✨ Features

### Product Management
- Create, read, update, and delete product records
- Track product details including SKU, name, description, quantity, location, and pricing

### Staff Management
- Maintain comprehensive staff profiles
- Track staff location

### Data Intelligence
- Search functionality
- Multi-parameter filtering
- Custom sorting options
  
## 🛠️ Technologies

### Frontend
- **React** - Component-based UI development
- **Material UI** - Polished, consistent interface design
- **React Router** - Seamless navigation between application views
- **Axios** - API communication

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Express** - Fast, minimalist web framework
- **JWT** - Secure authentication system

### Database
- **MongoDB** - Flexible NoSQL database
- **Mongoose** - Elegant MongoDB object modeling

## 📌 Roadmap

### Short Term
- **Login Page Redesign** - Modernize authentication interface with enhanced security features
- **Component Refactoring** - Apply DRY principles to inventory and staff management modules ✔
- **Authentication Context** - Implement AuthContext for centralized token management and authentication flow ✔
- **Dialog Confirmation** - Implement dialog for action confirmation like deleting

### Long Term
- Warehouse Realtime Management
- Metrics on products management
- 
## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Installation
```bash
# Clone repository
git clone https://github.com/alfredho-pranoto/warehouse-management.git

# Navigate to project directory
cd warehouse-management

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

### Usage
1. Access the application at `http://localhost:5173`
2. Create admin user via postman
3. Begin managing warehouse operations through the dashboard

## Documentation

https://documenter.getpostman.com/view/39406394/2sB2j1hXrb

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Alfredho Pranoto**

- GitHub: [@alfredho-pranoto](https://github.com/alfredho-pranoto)
- LinkedIn: [Alfredho Pranoto](https://linkedin.com/in/alfredho-pranoto)

---

Built with ❤️ for efficient warehouse operations
