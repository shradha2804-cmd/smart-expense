import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

import {
  HiOutlineMail,
  HiOutlineLocationMarker,
} from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="bg-[#F5F7FF] border-t border-gray-200">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-14">

        {/* LEFT */}
        <div>

          <h2 className="text-5xl font-bold text-primary">
            Smart Expense Tracker
          </h2>

          <p className="mt-6 text-gray-500 text-xl leading-relaxed">
            Smart expense tracking platform
            for modern users.
          </p>

          <div className="flex gap-5 mt-8">

            <div className="bg-white shadow-md p-4 rounded-full text-primary text-xl cursor-pointer">
              <FaFacebookF />
            </div>

            <div className="bg-white shadow-md p-4 rounded-full text-primary text-xl cursor-pointer">
              <FaTwitter />
            </div>

            <div className="bg-white shadow-md p-4 rounded-full text-primary text-xl cursor-pointer">
              <FaLinkedinIn />
            </div>

            <div className="bg-white shadow-md p-4 rounded-full text-primary text-xl cursor-pointer">
              <FaInstagram />
            </div>

          </div>

        </div>

        {/* CENTER */}
        <div>

          <h3 className="text-3xl font-bold text-[#0B132B] mb-8">
            Quick Links
          </h3>

          <ul className="space-y-5 text-gray-500 text-xl">

            <li>Home</li>
            <li>Features</li>
            <li>Contact</li>

          </ul>

        </div>

        {/* RIGHT */}
        <div>

          <h3 className="text-3xl font-bold text-[#0B132B] mb-8">
            Contact
          </h3>

          <div className="space-y-6 text-gray-500 text-xl">

            <div className="flex items-center gap-4">
              <HiOutlineMail className="text-primary text-2xl" />
              <span>support@SmartExpenseTracker.com</span>
            </div>

            <div className="flex items-center gap-4">
              <HiOutlineLocationMarker className="text-primary text-2xl" />
              <span>Bangalore, India</span>
            </div>

          </div>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-200 py-6 text-center text-gray-500 text-lg">
        © 2026 Smart Expense Tracker. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;