import React, { useState } from "react";

import { NavLink, Link } from "react-router-dom";

import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600 transition";

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-bold text-blue-600"
        >
          Smart Expense Tracker
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-[16px]">

          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>

          <NavLink to="/features" className={navLinkStyle}>
            Features
          </NavLink>

          <NavLink to="/about" className={navLinkStyle}>
            About
          </NavLink>

          <NavLink to="/contact" className={navLinkStyle}>
            Contact
          </NavLink>

          <Link to="/login">

            <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition">

              Login

            </button>

          </Link>

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (

        <div className="md:hidden bg-white px-5 pb-5 flex flex-col gap-5 text-base shadow-lg">

          <NavLink
            to="/"
            className={navLinkStyle}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/features"
            className={navLinkStyle}
            onClick={() => setMenuOpen(false)}
          >
            Features
          </NavLink>

          <NavLink
            to="/about"
            className={navLinkStyle}
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={navLinkStyle}
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </NavLink>

          <Link to="/login">

            <button className="bg-blue-600 text-white py-3 rounded-xl w-full">

              Login

            </button>

          </Link>

        </div>

      )}

    </nav>
  );
};

export default Navbar;