import React, { useState } from "react";

import { Link } from "react-router-dom";

import {
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto">

      <div className="bg-white rounded-[35px] shadow-xl p-5 md:p-8">

        <h2 className="text-2xl md:text-3xl font-bold text-[#0B132B]">

          Welcome Back

        </h2>

        <p className="mt-2 text-gray-500 text-sm md:text-base">

          Login to continue managing your finances.

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
                placeholder="Enter your password"
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

          {/* FORGOT PASSWORD */}
          <div className="text-right">

            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline text-sm"
            >
              Forgot Password?
            </Link>

          </div>

          {/* BUTTON */}
          <button className="w-full bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 transition">

            Login

          </button>

        </form>

        {/* REGISTER */}
        <p className="mt-6 text-center text-gray-500 text-sm">

          Don’t have an account?

          <Link
            to="/register"
            className="text-blue-600 ml-2 font-medium"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;