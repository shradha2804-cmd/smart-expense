import React from "react";

import {
  Outlet,
  Link,
  useNavigate,
} from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";

const AuthLayout = () => {

  const navigate = useNavigate();

  return (
    <section className="h-screen overflow-hidden bg-[#F5F7FF] flex items-center justify-center px-4 py-4">

      <div className="w-full max-w-6xl h-full max-h-[850px] bg-white rounded-[35px] overflow-hidden shadow-2xl grid lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex bg-blue-600 p-14 text-white flex-col justify-between relative overflow-hidden">

          {/* TOP */}
          <div>

            <Link
              to="/"
              className="text-4xl font-bold"
            >
              Finora
            </Link>

            <h1 className="mt-20 text-5xl font-bold leading-tight">

              Smart Finance
              <span className="block">
                Starts Here
              </span>

            </h1>

            <p className="mt-8 text-lg text-blue-100 leading-relaxed max-w-md">

              Manage expenses, track income,
              visualize reports and control your
              finances smarter with Finora.

            </p>

          </div>

          {/* BOTTOM CARD */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">

            <h3 className="text-2xl font-bold">
              Trusted by 10K+ Users
            </h3>

            <p className="mt-4 text-blue-100 leading-relaxed">
              Finora helps users manage finances
              with modern dashboards and secure systems.
            </p>

          </div>

          {/* CIRCLES */}
          <div className="absolute -bottom-20 -right-20 h-72 w-72 bg-white/10 rounded-full"></div>

          <div className="absolute top-10 right-10 h-20 w-20 bg-white/10 rounded-full"></div>

        </div>

        {/* RIGHT SIDE */}
        <div className="relative p-6 sm:p-8 md:p-10 lg:p-14 flex items-center overflow-y-auto">

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-5 left-5 md:top-8 md:left-8 h-11 w-11 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition flex items-center justify-center"
          >

            <FaArrowLeft />

          </button>

          {/* CONTENT */}
          <div className="w-full">

            <Outlet />

          </div>

        </div>

      </div>

    </section>
  );
};

export default AuthLayout;