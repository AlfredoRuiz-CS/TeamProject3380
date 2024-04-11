import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import ProductList from './pages/ProductList';
import AdminDashboard from './pages/AdminDashboard';
import MemberPage from './pages/MemberPage';
import Payment from './pages/Payment';
import Suppliers from './pages/Suppliers';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Home Page */}
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/home" element={<Home />} /> */}
        {/* User Auth/Account */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        {/* User Cart/Payments */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/list" element={<ProductList />} />
        <Route path="/membership" element={<MemberPage />} />
        <Route path="/payment" element={<Payment type={'cart'} />} />
        <Route
          path="/payment/membership"
          element={<Payment type={'membership'} />}
        />
        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />
        {/* Suppliers */}
        <Route path="/suppliers" element={<Suppliers />} />
        {/* Products */}
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<SingleProduct />} />
        {/* Any non-valid URL returns to home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
