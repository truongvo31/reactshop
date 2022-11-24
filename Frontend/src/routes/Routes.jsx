import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserProfile from "../pages/UserProfile";

const Approutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/catalog/:slug" element={<Product />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/about" element={<About />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/userprofile" element={<UserProfile />} />
    </Routes>
  );
};

export default Approutes;
