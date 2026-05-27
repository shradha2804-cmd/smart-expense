import React from "react";

const AdminDashboard = () => {

  return (
    <section>

      {/* TITLE */}
      <div>

        <h1 className="text-4xl font-bold text-[#2E1065]">

          Dashboard Overview

        </h1>

        <p className="mt-2 text-gray-500">

          Monitor users, analytics and transactions

        </p>

      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

        {/* USERS */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-gray-500">

            Total Users

          </p>

          <h1 className="mt-3 text-5xl font-bold text-[#2E1065]">

            0

          </h1>

        </div>

        {/* INCOME */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-gray-500">

            Total Income

          </p>

          <h1 className="mt-3 text-5xl font-bold text-green-600">

            ₹0

          </h1>

        </div>

        {/* EXPENSES */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-gray-500">

            Total Expenses

          </p>

          <h1 className="mt-3 text-5xl font-bold text-red-500">

            ₹0

          </h1>

        </div>

        {/* TRANSACTIONS */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-gray-500">

            Transactions

          </p>

          <h1 className="mt-3 text-5xl font-bold text-blue-600">

            0

          </h1>

        </div>

      </div>

      {/* CHARTS */}
      <div className="grid xl:grid-cols-2 gap-6 mt-10">

        <div className="bg-white rounded-3xl h-[400px] shadow-sm p-6">

          <h2 className="text-2xl font-bold text-[#2E1065]">

            Users Analytics

          </h2>

        </div>

        <div className="bg-white rounded-3xl h-[400px] shadow-sm p-6">

          <h2 className="text-2xl font-bold text-[#2E1065]">

            Transactions Analytics

          </h2>

        </div>

      </div>

    </section>
  );
};

export default AdminDashboard;