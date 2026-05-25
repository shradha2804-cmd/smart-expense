import React, { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
} from "react-icons/fa";

const Register = () => {

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  return (
    <section className="h-screen overflow-hidden bg-[#F5F7FF] flex items-center justify-center px-4 py-4">

      <div className="max-w-md mx-auto w-full">

        <div className="relative bg-white rounded-[35px] shadow-xl p-5 md:p-8">

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-5 left-5 h-10 w-10 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition flex items-center justify-center"
          >

            <FaArrowLeft />

          </button>

          <h2 className="text-2xl md:text-3xl font-bold text-[#0B132B] mt-12">

            Create Account

          </h2>

          <p className="mt-2 text-gray-500 text-sm md:text-base">

            Join Finora and start managing smarter.

          </p>

          {/* GOOGLE BUTTON */}
          <button className="mt-6 w-full border border-gray-300 rounded-2xl py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition">

            <FaGoogle className="text-red-500" />

            Continue with Google

          </button>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-6">

            <div className="flex-1 h-[1px] bg-gray-200"></div>

            <span className="text-gray-400 text-sm">
              OR
            </span>

            <div className="flex-1 h-[1px] bg-gray-200"></div>

          </div>

          {/* FORM */}
          <form className="space-y-5">

            {/* NAME */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-blue-600"
              />

            </div>

            {/* EMAIL */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-blue-600"
              />

            </div>

            {/* PASSWORD */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  className="w-full border border-gray-300 rounded-2xl px-5 py-3 pr-14 outline-none focus:border-blue-600"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 right-5 text-gray-500"
                >

                  {showPassword ? <FaEyeSlash /> : <FaEye />}

                </button>

              </div>

            </div>

            {/* BUTTON */}
            <button className="w-full bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 transition">

              Create Account

            </button>

          </form>

          {/* LOGIN */}
          <p className="mt-6 text-center text-gray-500 text-sm">

            Already have an account?

            <Link
              to="/login"
              className="text-blue-600 ml-2 font-medium"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </section>
  );
};

export default Register;