import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Products from './pages/Products';
import Product from './pages/SingleProduct';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Home Page */}
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {/* User Auth/Account */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />
        {/* Products */}
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<Product />} />
        {/* Any non-valid URL returns to home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
