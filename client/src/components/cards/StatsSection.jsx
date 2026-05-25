import React from "react";

const StatsSection = () => {
  return (
    <section className="py-20 bg-[#F5F7FF]">

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white rounded-3xl p-8 text-center shadow-sm">

            <h2 className="text-4xl font-bold text-blue-600">
              10K+
            </h2>

            <p className="mt-3 text-gray-500">
              Active Users
            </p>

          </div>

          <div className="bg-white rounded-3xl p-8 text-center shadow-sm">

            <h2 className="text-4xl font-bold text-blue-600">
              ₹50M+
            </h2>

            <p className="mt-3 text-gray-500">
              Transactions
            </p>

          </div>

          <div className="bg-white rounded-3xl p-8 text-center shadow-sm">

            <h2 className="text-4xl font-bold text-blue-600">
              99%
            </h2>

            <p className="mt-3 text-gray-500">
              Customer Satisfaction
            </p>

          </div>

          <div className="bg-white rounded-3xl p-8 text-center shadow-sm">

            <h2 className="text-4xl font-bold text-blue-600">
              24/7
            </h2>

            <p className="mt-3 text-gray-500">
              Support
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default StatsSection;