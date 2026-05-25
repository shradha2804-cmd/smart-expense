import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GuestLayout from "../layouts/GuestLayout";

import Home from "../pages/guest/Home";
import About from "../pages/guest/About";
import Features from "../pages/guest/Features";
import Pricing from "../pages/guest/Pricing";
import Contact from "../pages/guest/Contact";
import FAQ from "../pages/guest/FAQ";

import AuthLayout from "../layouts/AuthLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

const AppRoutes = () => {
  return (
    <BrowserRouter>

      <Routes>

        {/* Guest Layout */}
        <Route path="/" element={<GuestLayout />}>

          <Route index element={<Home />} />

          <Route path="about" element={<About />} />

          <Route path="features" element={<Features />} />

          <Route path="pricing" element={<Pricing />} />

          <Route path="contact" element={<Contact />} />

          <Route path="faq" element={<FAQ />} />

        </Route>

        {/* AUTH ROUTES */}
        <Route path="/" element={<AuthLayout />}>

        <Route path="login" element={<Login />} />

  <     Route path="register" element={<Register />} />

        <Route path="forgot-password" element={<ForgotPassword />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;