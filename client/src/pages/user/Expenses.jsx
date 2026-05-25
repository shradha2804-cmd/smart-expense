import React, { useState } from "react";

import {
  FaPlus,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

const Expenses = () => {

  const [showModal, setShowModal] = useState(false);

  const expenses = [
    {
      title: "Groceries",
      category: "Food",
      amount: "₹2,500",
      date: "25 May 2026",
    },

    {
      title: "Netflix",
      category: "Entertainment",
      amount: "₹799",
      date: "22 May 2026",
    },

    {
      title: "Electricity Bill",
      category: "Bills",
      amount: "₹1,200",
      date: "20 May 2026",
    },
  ];

  return (
    <section>

      {/* TOP */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div>

          <h1 className="text-3xl font-bold text-[#0B132B]">
            Expenses
          </h1>

          <p className="mt-2 text-gray-500">
            Manage and track all your expenses.
          </p>

        </div>

        {/* BUTTON */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl flex items-center gap-3 hover:bg-blue-700 transition w-fit"
        >

          <FaPlus />

          Add Expense

        </button>

      </div>

      {/* TABLE */}
      <div className="mt-8 bg-white rounded-3xl shadow-sm overflow-hidden">

        {/* HEADER */}
        <div className="hidden md:grid grid-cols-5 bg-[#F5F7FF] p-5 font-semibold text-[#0B132B]">

          <h3>Title</h3>
          <h3>Category</h3>
          <h3>Amount</h3>
          <h3>Date</h3>
          <h3 className="text-center">Actions</h3>

        </div>

        {/* BODY */}
        <div>

          {expenses.map((item, index) => (

            <div
              key={index}
              className="grid md:grid-cols-5 gap-4 p-5 border-t border-gray-100 items-center"
            >

              <div>
                <p className="font-semibold text-[#0B132B]">
                  {item.title}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  {item.category}
                </p>
              </div>

              <div>
                <p className="font-bold text-red-500">
                  {item.amount}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  {item.date}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center justify-start md:justify-center gap-4">

                <button className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition">

                  <FaEdit />

                </button>

                <button className="h-10 w-10 rounded-xl bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition">

                  <FaTrash />

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* MODAL */}
      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

          <div className="bg-white rounded-[35px] p-6 md:p-8 w-full max-w-lg">

            {/* TOP */}
            <div className="flex items-center justify-between">

              <h2 className="text-3xl font-bold text-[#0B132B]">

                Add Expense

              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-2xl text-gray-500"
              >
                ×
              </button>

            </div>

            {/* FORM */}
            <form className="mt-8 space-y-5">

              {/* TITLE */}
              <div>

                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Expense Title
                </label>

                <input
                  type="text"
                  placeholder="Enter title"
                  className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-blue-600"
                />

              </div>

              {/* CATEGORY */}
              <div>

                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Category
                </label>

                <select className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-blue-600">

                  <option>Food</option>
                  <option>Bills</option>
                  <option>Entertainment</option>
                  <option>Travel</option>

                </select>

              </div>

              {/* AMOUNT */}
              <div>

                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Amount
                </label>

                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-blue-600"
                />

              </div>

              {/* DATE */}
              <div>

                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Date
                </label>

                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-blue-600"
                />

              </div>

              {/* BUTTON */}
              <button className="w-full bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 transition">

                Save Expense

              </button>

            </form>

          </div>

        </div>

      )}

    </section>
  );
};

export default Expenses;