import React, {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import API from "../../utils/api";

import {
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Login = () => {

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const navigate =
    useNavigate();

  // LOGIN
  const handleLogin =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const { data } =
          await API.post(
            "/auth/login",
            {
              email,
              password,
            }
          );

        toast.success(
          "Login Successful"
        );

        // STORE ONLY TOKEN
        localStorage.setItem(
          "token",
          data.token
        );

        // STORE ADMIN STATUS
        localStorage.setItem(
          "isAdmin",
          String(
            data.isAdmin
          )
        );

        // ADMIN LOGIN
        if (data.isAdmin) {

          navigate(
            "/admin/dashboard"
          );

        } else {

          // USER LOGIN
          navigate(
            "/dashboard"
          );

        }

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

        {/* TITLE */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#0B132B] break-words">

          Welcome Back

        </h2>

        <p className="mt-2 text-gray-500 text-sm md:text-base">

          Login to continue managing your finances.

        </p>

        {/* GOOGLE BUTTON */}
        <button
          type="button"
          className="mt-6 w-full border border-gray-300 rounded-2xl py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition"
        >

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
        <form
          onSubmit={handleLogin}
          className="space-y-5"
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

          {/* PASSWORD */}
          <div>

            <label className="block mb-2 text-sm font-medium text-gray-700">

              Password

            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 rounded-2xl px-5 py-3 pr-14 outline-none focus:border-blue-600"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute top-1/2 -translate-y-1/2 right-5 text-gray-500"
              >

                {
                  showPassword
                    ? <FaEyeSlash />
                    : <FaEye />
                }

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
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 transition disabled:opacity-70"
          >

            {
              loading
                ? "Loading..."
                : "Login"
            }

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