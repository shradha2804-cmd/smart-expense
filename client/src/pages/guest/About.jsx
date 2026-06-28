import React from "react";
import {
  FaChartLine,
  FaShieldAlt,
  FaWallet,
  FaUsers,
} from "react-icons/fa";

const About = () => {
  return (
    <section className="bg-[#F5F7FF] overflow-hidden">

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 grid lg:grid-cols-2 gap-14 items-center">

        {/* LEFT */}
        <div>

          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-xl text-sm md:text-base">
            About Smart Expense Tracker
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-[#0B132B]">

            Smart Finance
            <span className="block text-blue-600">
              Management
            </span>

            For Everyone

          </h1>

          <p className="mt-8 text-base md:text-lg text-gray-600 leading-relaxed">

            Smart Expense Tracker is a modern smart expense tracker platform
            designed to help users manage their daily finances
            with ease, security and powerful analytics.

          </p>

          <p className="mt-5 text-base md:text-lg text-gray-600 leading-relaxed">

            From tracking expenses to visualizing reports,
            Smart Expense Tracker simplifies financial management using
            beautiful dashboards and intelligent insights.

          </p>

        </div>

        {/* RIGHT */}
        <div className="flex justify-center">

          <div className="bg-white rounded-[35px] shadow-xl p-6 md:p-8 w-full max-w-xl">

            {/* CARD 1 */}
            <div className="bg-blue-50 rounded-3xl p-5 flex items-center gap-5 mb-5">

              <div className="bg-blue-100 text-blue-600 h-14 w-14 rounded-2xl flex items-center justify-center text-2xl">
                <FaWallet />
              </div>

              <div>

                <h3 className="text-xl font-bold text-[#0B132B]">
                  Expense Tracking
                </h3>

                <p className="text-gray-500 mt-1">
                  Easily monitor your spending habits.
                </p>

              </div>

            </div>

            {/* CARD 2 */}
            <div className="bg-green-50 rounded-3xl p-5 flex items-center gap-5 mb-5">

              <div className="bg-green-100 text-green-600 h-14 w-14 rounded-2xl flex items-center justify-center text-2xl">
                <FaChartLine />
              </div>

              <div>

                <h3 className="text-xl font-bold text-[#0B132B]">
                  Analytics Dashboard
                </h3>

                <p className="text-gray-500 mt-1">
                  View financial reports with charts.
                </p>

              </div>

            </div>

            {/* CARD 3 */}
            <div className="bg-red-50 rounded-3xl p-5 flex items-center gap-5">

              <div className="bg-red-100 text-red-500 h-14 w-14 rounded-2xl flex items-center justify-center text-2xl">
                <FaShieldAlt />
              </div>

              <div>

                <h3 className="text-xl font-bold text-[#0B132B]">
                  Secure Platform
                </h3>

                <p className="text-gray-500 mt-1">
                  Your financial data stays protected.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* MISSION SECTION */}
      <div className="py-20 bg-white">

        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">

          <h2 className="text-3xl md:text-5xl font-bold text-[#0B132B]">

            Our Mission

          </h2>

          <p className="mt-8 text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">

            Our mission is to make financial management simple,
            accessible and intelligent for everyone. We believe
            users should have complete control over their money
            through clean dashboards, secure systems and
            insightful analytics.

          </p>

        </div>

      </div>

      {/* STATS SECTION */}
      <div className="py-20">

        <div className="max-w-7xl mx-auto px-4 md:px-6">

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* STAT 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm text-center">

              <div className="bg-blue-100 text-blue-600 h-16 w-16 rounded-2xl flex items-center justify-center text-3xl mx-auto">
                <FaUsers />
              </div>

              <h2 className="mt-6 text-4xl font-bold text-[#0B132B]">
                10K+
              </h2>

              <p className="mt-3 text-gray-500">
                Active Users
              </p>

            </div>

            {/* STAT 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm text-center">

              <div className="bg-green-100 text-green-600 h-16 w-16 rounded-2xl flex items-center justify-center text-3xl mx-auto">
                <FaWallet />
              </div>

              <h2 className="mt-6 text-4xl font-bold text-[#0B132B]">
                ₹50M+
              </h2>

              <p className="mt-3 text-gray-500">
                Transactions
              </p>

            </div>

            {/* STAT 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm text-center">

              <div className="bg-red-100 text-red-500 h-16 w-16 rounded-2xl flex items-center justify-center text-3xl mx-auto">
                <FaShieldAlt />
              </div>

              <h2 className="mt-6 text-4xl font-bold text-[#0B132B]">
                99%
              </h2>

              <p className="mt-3 text-gray-500">
                Secure Platform
              </p>

            </div>

            {/* STAT 4 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm text-center">

              <div className="bg-yellow-100 text-yellow-500 h-16 w-16 rounded-2xl flex items-center justify-center text-3xl mx-auto">
                <FaChartLine />
              </div>

              <h2 className="mt-6 text-4xl font-bold text-[#0B132B]">
                24/7
              </h2>

              <p className="mt-3 text-gray-500">
                Support
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default About;