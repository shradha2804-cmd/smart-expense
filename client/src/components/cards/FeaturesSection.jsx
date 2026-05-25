import React from "react";
import {
  FaWallet,
  FaChartPie,
  FaMoneyBillWave,
  FaShieldAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaWallet />,
    title: "Expense Tracking",
    description:
      "Track daily expenses easily with smart categorization.",
  },

  {
    icon: <FaMoneyBillWave />,
    title: "Income Management",
    description:
      "Manage all your income sources in one place.",
  },

  {
    icon: <FaChartPie />,
    title: "Analytics Dashboard",
    description:
      "Visualize spending with charts and monthly reports.",
  },

  {
    icon: <FaShieldAlt />,
    title: "Secure Data",
    description:
      "Your financial data stays safe with secure authentication.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* HEADING */}
        <div className="text-center mb-16">

          <h2 className="text-3xl md:text-5xl font-bold text-[#0B132B]">
            Powerful Features
          </h2>

          <p className="mt-5 text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Everything you need to manage your finances smarter and faster.
          </p>

        </div>

        {/* FEATURE GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => (

            <div
              key={index}
              className="bg-[#F5F7FF] p-8 rounded-3xl hover:-translate-y-2 transition duration-300 shadow-sm hover:shadow-xl"
            >

              <div className="bg-blue-100 text-blue-600 h-16 w-16 rounded-2xl flex items-center justify-center text-3xl">

                {feature.icon}

              </div>

              <h3 className="mt-6 text-2xl font-bold text-[#0B132B]">

                {feature.title}

              </h3>

              <p className="mt-4 text-gray-500 leading-relaxed">

                {feature.description}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default FeaturesSection;