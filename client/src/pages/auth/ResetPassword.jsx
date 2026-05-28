import React, {
  useState,
} from "react";

import {
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import API from "../../utils/api";

import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const ResetPassword =
  () => {

    const navigate =
      useNavigate();

    const { token } =
      useParams();

    const [password,
      setPassword] =
      useState("");

    const [confirmPassword,
      setConfirmPassword] =
      useState("");

    const [showPassword,
      setShowPassword] =
      useState(false);

    const [showConfirmPassword,
      setShowConfirmPassword] =
      useState(false);

    const [loading,
      setLoading] =
      useState(false);

    // SUBMIT
    const handleResetPassword =
      async (e) => {

        e.preventDefault();

        // VALIDATION
        if (
          password.length < 6
        ) {

          return toast.error(
            "Password must be at least 6 characters"
          );

        }

        if (
          password !==
          confirmPassword
        ) {

          return toast.error(
            "Passwords do not match"
          );

        }

        try {

          setLoading(true);

          const { data } =
            await API.post(
              `/auth/reset-password/${token}`,
              {
                password,
              }
            );

          toast.success(
            data.message ||
            "Password reset successful"
          );

          // REDIRECT
          setTimeout(() => {

            navigate(
              "/login"
            );

          }, 1500);

        } catch (error) {

          toast.error(
            error.response?.data
              ?.message ||
              "Reset failed"
          );

        } finally {

          setLoading(false);

        }

      };

    return (
      <div className="w-full max-w-md mx-auto">

        <div className="bg-white rounded-[35px] shadow-xl p-5 md:p-8 overflow-hidden">

          <h2 className="text-2xl md:text-3xl font-bold text-[#0B132B] break-words">

            Reset Password

          </h2>

          <p className="mt-2 text-gray-500 text-sm md:text-base">

            Enter your new password below.

          </p>

          {/* FORM */}
          <form
            onSubmit={
              handleResetPassword
            }
            className="mt-8 space-y-5"
          >

            {/* PASSWORD */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700">

                New Password

              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  required
                  className="w-full border border-gray-300 rounded-2xl px-5 py-3 pr-14 outline-none focus:border-blue-600"
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

            {/* CONFIRM PASSWORD */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700">

                Confirm Password

              </label>

              <div className="relative">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm password"
                  value={
                    confirmPassword
                  }
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  required
                  className="w-full border border-gray-300 rounded-2xl px-5 py-3 pr-14 outline-none focus:border-blue-600"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute top-1/2 -translate-y-1/2 right-5 text-gray-500"
                >

                  {
                    showConfirmPassword
                      ? <FaEyeSlash />
                      : <FaEye />
                  }

                </button>

              </div>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 transition disabled:opacity-70"
            >

              {
                loading
                  ? "Updating..."
                  : "Reset Password"
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

export default ResetPassword;