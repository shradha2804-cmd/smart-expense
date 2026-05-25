import React from "react";
import FeaturesSection from "../../components/cards/FeaturesSection";
import StatsSection from "../../components/cards/StatsSection";
import TestimonialsSection from "../../components/cards/TestimonialsSection";
import CTASection from "../../components/cards/CTASection";
import { useNavigate } from "react-router-dom";

const Home = () => {
      const navigate = useNavigate();
  return (
    <section className="min-h-screen bg-[#F5F7FF] overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT SECTION */}
        <div className="w-full">

          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-xl text-sm md:text-base">
            Smart Expense Tracker
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-[#0B132B]">

            Track Expenses

            <span className="block text-blue-600">
              Smarter
            </span>

            With Finora

          </h1>

          <p className="mt-6 text-base md:text-lg text-gray-500 leading-relaxed max-w-xl">

            Manage your income, expenses, analytics and
            reports with a beautiful modern finance dashboard.

          </p>

          <div className="mt-8 flex gap-4 flex-wrap">

           <button
             onClick={() => navigate("/register")}
             className="bg-blue-600 text-white px-6 md:px-8 py-3 rounded-2xl text-base md:text-lg hover:bg-blue-700 transition">

                Get Started

            </button>

            <button 
              onClick={() => navigate("/about")}
              className="border border-black px-6 md:px-8 py-3 rounded-2xl text-base md:text-lg hover:bg-black hover:text-white transition">

              Learn More

            </button>

          </div>

        </div>

        {/* RIGHT SECTION */}
        <div className="w-full">

          <div className="bg-white rounded-[30px] shadow-xl p-4 sm:p-6 md:p-8 w-full overflow-hidden">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">

              <h2 className="text-2xl md:text-4xl font-bold text-[#0B132B]">
                Monthly Overview
              </h2>

              <select className="border border-gray-200 px-3 py-2 rounded-xl text-sm md:text-base w-fit">
                <option>May 2026</option>
              </select>

            </div>

            {/* INCOME CARD */}
            <div className="bg-green-50 p-4 sm:p-5 rounded-3xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-5">

              <div className="flex items-center gap-4">

                <div className="bg-green-100 h-12 w-12 rounded-full flex items-center justify-center text-xl shrink-0">
                  📈
                </div>

                <div>

                  <h3 className="text-green-600 text-lg font-semibold">
                    Income
                  </h3>

                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B132B] mt-1 break-words">
                    ₹50,000
                  </p>

                </div>

              </div>

              <div className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm sm:text-base w-fit">
                +12.5%
              </div>

            </div>

            {/* EXPENSE CARD */}
            <div className="bg-red-50 p-4 sm:p-5 rounded-3xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-5">

              <div className="flex items-center gap-4">

                <div className="bg-red-100 h-12 w-12 rounded-full flex items-center justify-center text-xl shrink-0">
                  📉
                </div>

                <div>

                  <h3 className="text-red-500 text-lg font-semibold">
                    Expenses
                  </h3>

                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B132B] mt-1 break-words">
                    ₹20,000
                  </p>

                </div>

              </div>

              <div className="bg-red-100 text-red-500 px-4 py-2 rounded-full text-sm sm:text-base w-fit">
                -8.4%
              </div>

            </div>

            {/* BALANCE CARD */}
            <div className="bg-blue-50 p-4 sm:p-5 rounded-3xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

              <div className="flex items-center gap-4">

                <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center text-xl shrink-0">
                  💳
                </div>

                <div>

                  <h3 className="text-blue-600 text-lg font-semibold">
                    Balance
                  </h3>

                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B132B] mt-1 break-words">
                    ₹30,000
                  </p>

                </div>

              </div>

              <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm sm:text-base w-fit">
                +15.2%
              </div>

            </div>

          </div>

        </div>

      </div>
    <FeaturesSection />

    <StatsSection />

    <TestimonialsSection />

    <CTASection />
    </section>
  );
};

export default Home;