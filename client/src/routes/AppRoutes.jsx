import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import AdminProtectedRoute from "./AdminProtectedRoute";

// GUEST LAYOUT
import GuestLayout from "../layouts/GuestLayout";

// AUTH LAYOUT
import AuthLayout from "../layouts/AuthLayout";

// USER LAYOUT
import UserLayout from "../layouts/UserLayout";

// ADMIN LAYOUT
import AdminLayout from "../layouts/AdminLayout";

// GUEST PAGES
import Home from "../pages/guest/Home";
import About from "../pages/guest/About";
import Features from "../pages/guest/Features";
import Pricing from "../pages/guest/Pricing";
import Contact from "../pages/guest/Contact";
import FAQ from "../pages/guest/FAQ";

// AUTH PAGES
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

// USER PAGES
import Dashboard from "../pages/user/Dashboard";
import Expenses from "../pages/user/Expenses";
import Income from "../pages/user/Income";
import Settings from "../pages/user/Settings";
import Notifications from "../pages/user/Notifications";
import Analytics from "../pages/user/Analytics";

// ADMIN PAGES
import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import AdminNotifications from "../pages/admin/AdminNotifications";
import AdminAnalytics from "../pages/admin/AdminAnalytics";
import AdminSettings from "../pages/admin/AdminSettings";
import AdminMessages from "../pages/admin/AdminMessages";

const AppRoutes = () => {

  return (

    <BrowserRouter>

      <Routes>

        {/* ================= GUEST ================= */}
        <Route
          path="/"
          element={<GuestLayout />}
        >

          <Route
            index
            element={<Home />}
          />

          <Route
            path="about"
            element={<About />}
          />

          <Route
            path="features"
            element={<Features />}
          />

          <Route
            path="pricing"
            element={<Pricing />}
          />

          <Route
            path="contact"
            element={<Contact />}
          />

          <Route
            path="faq"
            element={<FAQ />}
          />

        </Route>

        {/* ================= AUTH ================= */}
        <Route
          path="/"
          element={<AuthLayout />}
        >

          <Route
            path="login"
            element={<Login />}
          />

          <Route
            path="register"
            element={<Register />}
          />

          <Route
            path="forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="reset-password/:token"
            element={<ResetPassword />}
          />

        </Route>

        {/* ================= USER ================= */}
        <Route
          path="/"
          element={
            <ProtectedRoute>

              <UserLayout />

            </ProtectedRoute>
          }
        >

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="expenses"
            element={<Expenses />}
          />

          <Route
            path="income"
            element={<Income />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />

          <Route
            path="notifications"
            element={<Notifications />}
          />

          <Route
            path="analytics"
            element={<Analytics />}
          />

        </Route>

        {/* ================= ADMIN ================= */}
        <Route
          element={
            <AdminProtectedRoute />
          }
        >

          <Route
            element={<AdminLayout />}
          >

            <Route
              path="/admin/dashboard"
              element={
                <AdminDashboard />
              }
            />

            <Route
              path="/admin/users"
              element={<Users />}
            />

            <Route
              path="/admin/notifications"
              element={
                <AdminNotifications />
              }
            />

            <Route
              path="/admin/analytics"
              element={
                <AdminAnalytics />
              }
            />

            <Route
              path="/admin/settings"
              element={
                <AdminSettings />
              }
            />

            <Route
              path="/admin/messages"
              element={
                <AdminMessages />
              }
            />

          </Route>

        </Route>

      </Routes>

    </BrowserRouter>

  );

};

export default AppRoutes;