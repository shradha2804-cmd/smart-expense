import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../../utils/api";

import {
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Register = () => {

const [showPassword, setShowPassword] = useState(false);

const [name, setName] = useState("");

const [email, setEmail] = useState("");

const [password, setPassword] = useState("");

const [loading, setLoading] = useState(false);

const navigate = useNavigate();

const [phone, setPhone] =
  useState("");

const handleRegister = async (e) => {

  e.preventDefault();

  try {

    setLoading(true);

    const { data } = await API.post(
      "/auth/register",
      {
        name,
        email,
        phone,
        password,
      }
    );
toast.success("Registration Successful");

navigate("/login");

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Something went wrong"
    );

  } finally {

    setLoading(false);

  }

};

  return (
    <div className="w-full max-w-md mx-auto">

      <div className="bg-white rounded-[35px] shadow-xl p-5 md:p-8">

        <h2 className="text-2xl md:text-3xl font-bold text-[#0B132B]">

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
        <form
  onSubmit={handleRegister}
  className="space-y-5"
>

          {/* NAME */}
          <div>

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Full Name
            </label>
        <input
  type="text"
  placeholder="Enter your full name"
  value={name}
  onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-blue-600"
            />

          </div>

          {/* PHONE */}
<div>

  <label className="block mb-2 text-sm font-medium text-gray-700">

    Phone Number

  </label>

  <input
    type="text"
    placeholder="Enter phone number"
    value={phone}
    onChange={(e) =>
      setPhone(e.target.value)
    }
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
  value={password}
  onChange={(e) => setPassword(e.target.value)}
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
   <button
  type="submit"
  className="w-full bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 transition"
>

  {loading ? "Loading..." : "Create Account"}

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
  );
};

export default Register;