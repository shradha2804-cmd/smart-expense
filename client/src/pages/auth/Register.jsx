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

const Register = () => {

  const [showPassword,
    setShowPassword] =
    useState(false);

    const [name,
  setName] =
  useState("");

const [email,
  setEmail] =
  useState("");

const [phone,
  setPhone] =
  useState("");

const [password,
  setPassword] =
  useState("");

const [nameError,
  setNameError] =
  useState("");

const [emailError,
  setEmailError] =
  useState("");

const [phoneError,
  setPhoneError] =
  useState("");

const [passwordError,
  setPasswordError] =
  useState("");


  const [loading,
    setLoading] =
    useState(false);

  const navigate =
    useNavigate();

const handleNameChange =
  (e) => {

    const value =
      e.target.value;

    setName(value);

    if (!value.trim()) {

      setNameError("");

    }

    else if (
      !/^[A-Za-z\s]+$/.test(
        value
      )
    ) {

      setNameError(
        "Only letters and spaces are allowed"
      );

    }

    else if (
      value.trim().length < 3
    ) {

      setNameError(
        "Name must be at least 3 characters"
      );

    }

    else {

      setNameError("");

    }

  };


const handleEmailChange =
  (e) => {

    const value =
      e.target.value;

    setEmail(value);

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value.trim()) {

  setEmailError("");

}

else if (
  !emailRegex.test(value)
) {

  setEmailError(
    "Enter a valid email address"
  );

}

else {

  setEmailError("");

}

  };

const handlePhoneChange =
  (e) => {

    const value =
      e.target.value
        .replace(
          /\D/g,
          ""
        )
        .slice(
          0,
          10
        );

    setPhone(value);

    const phoneRegex =
      /^[6-9][0-9]{9}$/;

    if (!value) {

  setPhoneError("");

}

else if (
  !phoneRegex.test(value)
) {

  setPhoneError(
    "Enter a valid phone number"
  );

}

else {

  setPhoneError("");

}

  };

const handlePasswordChange =
  (e) => {

    const value =
      e.target.value;

    setPassword(value);

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!value) {

  setPasswordError("");

}

else if (
  !passwordRegex.test(value)
) {

  setPasswordError(
    "Password must contain uppercase, lowercase, number and special character and be at least 8 characters"
  );

}

else {

  setPasswordError("");

}
  };
  const handleRegister =
  async (e) => {

    e.preventDefault();

    if (
      !name ||
      !email ||
      !phone ||
      !password
    ) {

      return toast.error(
        "Please fill all fields"
      );

    }

    if (
      nameError ||
      emailError ||
      phoneError ||
      passwordError
    ) {

      return toast.error(
        "Please fix validation errors"
      );

    }

    try {

      setLoading(true);

      await API.post(
        "/auth/register",
        {
          name,
          email,
          phone,
          password,
        }
      );

      toast.success(
        "Registration Successful"
      );

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

      <div className="bg-white rounded-[35px] shadow-xl p-5 md:p-8 overflow-hidden">

        <h2 className="text-2xl md:text-3xl font-bold text-[#0B132B] break-words">

          Create Account

        </h2>

        <p className="mt-2 text-gray-500 text-sm md:text-base">

          Join Smart Expense Tracker and start managing smarter.

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
              onChange={
              handleNameChange
            }
              className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-blue-600"
              required
            />
            
          {
            nameError && (

            <p className="text-red-500 text-sm mt-1">

            {nameError}

            </p>

                )
          }


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
              onChange={
  handleEmailChange
}
              className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-blue-600"
              required
            />

{
  emailError && (

    <p className="text-red-500 text-sm mt-1">

      {emailError}

    </p>

  )
}
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
              onChange={handlePhoneChange}
              className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-blue-600"
              required
            />

{
  phoneError && (

    <p className="text-red-500 text-sm mt-1">

      {phoneError}

    </p>

  )
}


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
                placeholder="Create password"
                value={password}
               onChange={
  handlePasswordChange
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
                {
  passwordError && (

    <p className="text-red-500 text-sm mt-1">

      {passwordError}

    </p>

  )
}
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
                : "Create Account"
            }

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