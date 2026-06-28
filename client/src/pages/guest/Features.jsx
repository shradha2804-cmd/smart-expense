import React from "react";

import {
  FaWallet,
  FaChartPie,
  FaMoneyBillWave,
  FaShieldAlt,
  FaBell,
  FaMobileAlt,
  FaCloud,
  FaLock,
} from "react-icons/fa";

const features = [
  {
    icon: <FaWallet />,
    title: "Expense Tracking",
    description:
      "Track your daily expenses easily with smart categorization.",
    color: "blue",
  },

  {
    icon: <FaMoneyBillWave />,
    title: "Income Management",
    description:
      "Manage all income sources from one dashboard.",
    color: "green",
  },

  {
    icon: <FaChartPie />,
    title: "Analytics Dashboard",
    description:
      "Visualize reports and spending with interactive charts.",
    color: "purple",
  },

  {
    icon: <FaShieldAlt />,
    title: "Secure Platform",
    description:
      "Your financial data stays protected and encrypted.",
    color: "red",
  },

  {
    icon: <FaBell />,
    title: "Smart Notifications",
    description:
      "Get reminders for budgets, bills and monthly goals.",
    color: "yellow",
  },

  {
    icon: <FaMobileAlt />,
    title: "Mobile Responsive",
    description:
      "Access Smart Expense TRacker beautifully on desktop, tablet and mobile.",
    color: "pink",
  },

  {
    icon: <FaCloud />,
    title: "Cloud Backup",
    description:
      "Securely store your data with cloud synchronization.",
    color: "cyan",
  },

  {
    icon: <FaLock />,
    title: "JWT Authentication",
    description:
      "Advanced authentication system for secure access.",
    color: "orange",
  },
];

const Features = () => {
  return (
    <section className="bg-[#F5F7FF] overflow-hidden">

      {/* HERO */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 text-center">

        <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-xl text-sm md:text-base">
          Smart Expense TRacker Features
        </div>

        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold text-[#0B132B] leading-tight">

          Powerful Features For
          <span className="block text-blue-600">
            Smart Finance Management
          </span>

        </h1>

        <p className="mt-8 text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">

          Smart Expense TRacker provides powerful tools to manage expenses,
          income, analytics, reports and financial planning
          with a modern responsive dashboard.

        </p>

      </div>

      {/* FEATURES GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20">

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >

              {/* ICON */}
              <div
                className={`h-16 w-16 rounded-2xl flex items-center justify-center text-3xl
                ${feature.color === "blue" && "bg-blue-100 text-blue-600"}
                ${feature.color === "green" && "bg-green-100 text-green-600"}
                ${feature.color === "purple" && "bg-purple-100 text-purple-600"}
                ${feature.color === "red" && "bg-red-100 text-red-500"}
                ${feature.color === "yellow" && "bg-yellow-100 text-yellow-500"}
                ${feature.color === "pink" && "bg-pink-100 text-pink-500"}
                ${feature.color === "cyan" && "bg-cyan-100 text-cyan-600"}
                ${feature.color === "orange" && "bg-orange-100 text-orange-500"}
                `}
              >

                {feature.icon}

              </div>

              <h2 className="mt-6 text-2xl font-bold text-[#0B132B]">

                {feature.title}

              </h2>

              <p className="mt-4 text-gray-500 leading-relaxed">

                {feature.description}

              </p>

            </div>

          ))}

        </div>

      </div>

      {/* EXTRA SECTION */}
      <div className="bg-white py-20">

        <div className="max-w-6xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <div>

            <h2 className="text-3xl md:text-5xl font-bold text-[#0B132B] leading-tight">

              Everything You Need
              To Manage Finances

            </h2>

            <p className="mt-8 text-lg text-gray-600 leading-relaxed">

              Smart Expense TRacker combines beautiful dashboards,
              powerful analytics and secure authentication
              to give users complete control over
              their finances.

            </p>

            <button className="mt-10 bg-blue-600 text-white px-8 py-4 rounded-2xl hover:bg-blue-700 transition">

              Explore Features

            </button>

          </div>

          {/* RIGHT */}
          <div className="bg-[#F5F7FF] rounded-[35px] p-8">

            <div className="space-y-5">

              <div className="bg-white p-5 rounded-2xl shadow-sm flex justify-between items-center">

                <div>

                  <h3 className="text-xl font-bold text-[#0B132B]">
                    Monthly Expenses
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Updated analytics report
                  </p>

                </div>

                <span className="text-red-500 text-2xl font-bold">
                  ₹20K
                </span>

              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm flex justify-between items-center">

                <div>

                  <h3 className="text-xl font-bold text-[#0B132B]">
                    Monthly Income
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Income summary updated
                  </p>

                </div>

                <span className="text-green-600 text-2xl font-bold">
                  ₹50K
                </span>

              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm flex justify-between items-center">

                <div>

                  <h3 className="text-xl font-bold text-[#0B132B]">
                    Savings Goal
                  </h3>

                  <p className="text-gray-500 mt-1">
                    75% completed this month
                  </p>

                </div>

                <span className="text-blue-600 text-2xl font-bold">
                  75%
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Features;