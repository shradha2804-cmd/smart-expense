import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

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



import UserLayout from "../layouts/UserLayout";
import Dashboard from "../pages/user/Dashboard";
import Expenses from "../pages/user/Expenses";
import Income from "../pages/user/Income";
import Settings from "../pages/user/Settings";


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


        {/* USER ROUTES */}
        <Route
        path="/"
        element={
        <ProtectedRoute>
        <UserLayout />
        </ProtectedRoute>
        }
>

        <Route path="dashboard" element={<Dashboard />} />

        <Route path="expenses" element={<Expenses />} />

        <Route path="income" element={<Income />} />

        <Route path="settings" element={<Settings />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;