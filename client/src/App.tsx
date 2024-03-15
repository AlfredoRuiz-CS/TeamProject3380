import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import Products from "./pages/Products";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Home Page */}
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        {/* Any non-valid URL returns to home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
