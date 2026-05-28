import React, {
  useState,
} from "react";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../../utils/api";

const ForgotPassword = () => {

  const [email,
    setEmail] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  // SUBMIT
  const handleForgotPassword =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const { data } =
          await API.post(
            "/auth/forgot-password",
            {
              email,
            }
          );

        toast.success(
          data.message ||
          "Reset instructions sent"
        );

        setEmail("");

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Something went wrong"
        );

      } finally {

        setLoading(false);

      }

    };

  return (
    <div className="w-full max-w-md mx-auto">

      <div className="bg-white rounded-[35px] shadow-xl p-5 md:p-8 overflow-hidden">

        <h2 className="text-2xl md:text-3xl font-bold text-[#0B132B] break-words">

          Forgot Password

        </h2>

        <p className="mt-2 text-gray-500 text-sm md:text-base">

          Enter your email to receive reset instructions.

        </p>

        {/* FORM */}
        <form
          onSubmit={
            handleForgotPassword
          }
          className="mt-8 space-y-5"
        >

          {/* EMAIL */}
          <div>

            <label className="block mb-2 text-sm font-medium text-gray-700">

              Email

            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-blue-600"
              required
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 transition disabled:opacity-70"
          >

            {
              loading
                ? "Sending..."
                : "Send Reset Link"
            }

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