import React, {
  useEffect,
  useState,
} from "react";

import {
  FaPlus,
  FaTrash,
} from "react-icons/fa";

import toast from "react-hot-toast";

import API from "../../utils/api";

const Expenses = () => {

  const [showModal,
    setShowModal] =
    useState(false);

  const [expenses,
    setExpenses] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [submitting,
    setSubmitting] =
    useState(false);

  const [title,
    setTitle] =
    useState("");

  const [category,
    setCategory] =
    useState("");

  const [amount,
    setAmount] =
    useState("");

  const [date,
    setDate] =
    useState("");

  // FETCH
  const fetchExpenses =
    async () => {

      try {

        const { data } =
          await API.get(
            "/expenses"
          );

        setExpenses(data);

      } catch (error) {

        toast.error(
          "Failed to load expenses"
        );

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchExpenses();

  }, []);

  // ADD
  const handleAddExpense =
    async (e) => {

      e.preventDefault();

      try {

        setSubmitting(true);

        await API.post(
          "/expenses",
          {
            title,
            category,
            amount,
            date,
          }
        );

        toast.success(
          "Expense Added"
        );

        setShowModal(false);

        // REFRESH DATA
        await fetchExpenses();

        // UPDATE NOTIFICATIONS
        window.dispatchEvent(
          new Event(
            "notificationUpdate"
          )
        );

        // RESET
        setTitle("");

        setCategory("");

        setAmount("");

        setDate("");

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Failed to add expense"
        );

      } finally {

        setSubmitting(false);

      }

    };

  // DELETE
  const handleDelete =
    async (id) => {

      try {

        await API.delete(
          `/expenses/${id}`
        );

        toast.success(
          "Expense Deleted"
        );

        // REFRESH
        fetchExpenses();

      } catch (error) {

        toast.error(
          "Failed to delete expense"
        );

      }

    };

  if (loading) {

    return (
      <div className="text-center py-20 text-xl font-bold text-[#0B132B]">

        Loading...

      </div>
    );

  }

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

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-red-600 text-white px-6 py-3 rounded-2xl flex items-center gap-3 hover:bg-red-700 transition w-fit"
        >

          <FaPlus />

          Add Expense

        </button>

      </div>

      {/* TABLE */}
      <div className="mt-8 bg-white rounded-3xl shadow-sm overflow-hidden">

        <div className="hidden md:grid grid-cols-5 bg-[#F5F7FF] p-5 font-semibold text-[#0B132B]">

          <h3>Title</h3>

          <h3>Category</h3>

          <h3>Amount</h3>

          <h3>Date</h3>

          <h3 className="text-center">

            Actions

          </h3>

        </div>

        <div>

          {
            expenses.length === 0 ? (

              <div className="p-10 text-center text-gray-500">

                No expenses found

              </div>

            ) : (

              expenses.map(
                (item) => (

                  <div
                    key={item._id}
                    className="grid md:grid-cols-5 gap-4 p-5 border-t border-gray-100 items-center"
                  >

                    <div>

                      <p className="font-semibold text-[#0B132B] break-words">

                        {item.title}

                      </p>

                    </div>

                    <div>

                      <p className="text-gray-500 break-words">

                        {item.category}

                      </p>

                    </div>

                    <div>

                      <p className="font-bold text-red-600">

                        ₹{item.amount}

                      </p>

                    </div>

                    <div>

                      <p className="text-gray-500">

                        {
                          new Date(
                            item.date
                          ).toLocaleDateString()
                        }

                      </p>

                    </div>

                    <div className="flex justify-center">

                      <button
                        onClick={() =>
                          handleDelete(
                            item._id
                          )
                        }
                        className="h-10 w-10 rounded-xl bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                      >

                        <FaTrash />

                      </button>

                    </div>

                  </div>

                )
              )

            )
          }

        </div>

      </div>

      {/* MODAL */}
      {
        showModal && (

          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

            <div className="bg-white rounded-[35px] p-6 md:p-8 w-full max-w-lg">

              <div className="flex items-center justify-between">

                <h2 className="text-3xl font-bold text-[#0B132B]">

                  Add Expense

                </h2>

                <button
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="text-2xl text-gray-500"
                >

                  ×

                </button>

              </div>

              <form
                onSubmit={
                  handleAddExpense
                }
                className="mt-8 space-y-5"
              >

                <input
                  type="text"
                  placeholder="Expense Title"
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-300 rounded-2xl px-5 py-3"
                  required
                />

                <input
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-300 rounded-2xl px-5 py-3"
                  required
                />

                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) =>
                    setAmount(
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-300 rounded-2xl px-5 py-3"
                  required
                />

                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-300 rounded-2xl px-5 py-3"
                  required
                />

                <button
                  disabled={submitting}
                  className="w-full bg-red-600 text-white py-3 rounded-2xl hover:bg-red-700 transition disabled:opacity-70"
                >

                  {
                    submitting
                      ? "Saving..."
                      : "Save Expense"
                  }

                </button>

              </form>

            </div>

          </div>

        )
      }

    </section>
  );
};

export default Expenses;