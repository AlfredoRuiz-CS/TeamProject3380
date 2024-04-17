import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import OrderSummary from './pages/OrderSummary';
import MemberPage from './pages/MemberPage';
import Payment from './pages/Payment';
import Suppliers from './pages/Suppliers';
import ShippingInformation from './pages/Shipping';
import AdminDashboard from './pages/AdminDashboard';
import Notifications from './pages/Notifications';
import { Navigate } from 'react-router-dom';
import useUserStore from './components/store';
import './index.css';

function App() {
  const user = useUserStore();

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
        <Route path="/profile" element={user.loggedIn ? <Profile /> : <Navigate to="/register" />} />
        <Route path="/orders" element={user.loggedIn ? <Orders /> : <Navigate to="/register" />} />
        <Route path="/orders/summary/:orderID" element={user.loggedIn ? <OrderSummary type={'order'} /> : <Navigate to="/register" />} />
        <Route path="/orders/summary/membership" element={user.loggedIn ? <OrderSummary type={'membership'} /> : <Navigate to="/register" />} />
        {/* User Cart/Payments */}
        <Route path="/cart" element={user.loggedIn ? <Cart /> : <Navigate to="/register" />} />
        <Route path="/list" element={user.loggedIn ? <ProductList /> : <Navigate to="/" />} />
        <Route path="/membership" element={!user.isMember ? <MemberPage /> : <Navigate to="/" />} />
        <Route path="/payment" element={user.loggedIn ? <Payment type={'cart'} /> : <Navigate to="/register" />} />
        <Route
          path="/payment/membership"
          element={user.loggedIn ? <Payment type={'membership'} /> : <Navigate to="/register" />}
        />
        {/* Admin Dashboard */}
        <Route path="/admin" element={user.loggedIn && user.isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path='/notifications' element={user.loggedIn && user.isAdmin ? <Notifications /> : <Navigate to="/login" />} />
        {/* Suppliers */}
        <Route path="/suppliers" element={user.loggedIn && user.isAdmin ? <Suppliers /> : <Navigate to="/login" />} />
        {/* Products */}
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<SingleProduct />} />
        {/* Shipping */}
        <Route path="/shipping" element={<ShippingInformation />} />
        {/* Any non-valid URL returns to home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
