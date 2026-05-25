import React from "react";

import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="w-full max-w-md mx-auto">

      <div className="bg-white rounded-[35px] shadow-xl p-5 md:p-8">

        <h2 className="text-2xl md:text-3xl font-bold text-[#0B132B]">

          Forgot Password

        </h2>

        <p className="mt-2 text-gray-500 text-sm md:text-base">

          Enter your email to receive reset instructions.

        </p>

        {/* FORM */}
        <form className="mt-8 space-y-5">

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

          {/* BUTTON */}
          <button className="w-full bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 transition">

            Send Reset Link

          </button>

        </form>

        {/* LOGIN */}
        <p className="mt-6 text-center text-gray-500 text-sm">

          Back to

          <Link
            to="/login"
            className="text-blue-600 ml-2 font-medium"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default ForgotPassword;