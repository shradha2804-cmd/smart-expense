import React from "react";
import AnalyticsCharts from "../../components/dashboard/AnalyticsCharts";
import {
  FaArrowUp,
  FaArrowDown,
  FaWallet,
} from "react-icons/fa";

const Dashboard = () => {

  const transactions = [
    {
      title: "Salary",
      amount: "+ ₹50,000",
      type: "income",
    },

    {
      title: "Groceries",
      amount: "- ₹2,500",
      type: "expense",
    },

    {
      title: "Electricity Bill",
      amount: "- ₹1,200",
      type: "expense",
    },

    {
      title: "Freelance",
      amount: "+ ₹10,000",
      type: "income",
    },
  ];

  return (
    <section>

      {/* TOP CARDS */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* CARD 1 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">
                Total Balance
              </p>

              <h2 className="mt-3 text-4xl font-bold text-[#0B132B]">
                ₹30,000
              </h2>

            </div>

            <div className="h-16 w-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl">

              <FaWallet />

            </div>

          </div>

        </div>

        {/* CARD 2 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">
                Total Income
              </p>

              <h2 className="mt-3 text-4xl font-bold text-green-600">
                ₹50,000
              </h2>

            </div>

            <div className="h-16 w-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-3xl">

              <FaArrowUp />

            </div>

          </div>

        </div>

        {/* CARD 3 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">
                Total Expenses
              </p>

              <h2 className="mt-3 text-4xl font-bold text-red-500">
                ₹20,000
              </h2>

            </div>

            <div className="h-16 w-16 rounded-2xl bg-red-100 text-red-500 flex items-center justify-center text-3xl">

              <FaArrowDown />

            </div>

          </div>

        </div>

      </div>

      {/* BOTTOM SECTION */}
      <div className="grid xl:grid-cols-3 gap-6 mt-6">

        {/* ANALYTICS */}
        <div className="xl:col-span-2 bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-bold text-[#0B132B]">
              Analytics
            </h2>

            <button className="text-blue-600">
              View Report
            </button>

          </div>

        <div className="mt-8">

        <AnalyticsCharts />

        </div>

        </div>

        {/* TRANSACTIONS */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-bold text-[#0B132B]">
              Recent Transactions
            </h2>

          </div>

          {/* LIST */}
          <div className="mt-8 space-y-5">

            {transactions.map((item, index) => (

              <div
                key={index}
                className="flex items-center justify-between bg-[#F5F7FF] p-4 rounded-2xl"
              >

                <div>

                  <h3 className="font-semibold text-[#0B132B]">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {item.type}
                  </p>

                </div>

                <h2
                  className={`font-bold text-lg ${
                    item.type === "income"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {item.amount}
                </h2>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default Dashboard;