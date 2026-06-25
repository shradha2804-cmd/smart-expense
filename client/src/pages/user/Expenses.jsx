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

import Select from "react-select";

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

    const categoryOptions = [
  { value: "Food", label: "🍔 Food" },
  { value: "Transportation", label: "🚗 Transportation" },
  { value: "Shopping", label: "🛍️ Shopping" },
  { value: "Bills", label: "💡 Bills" },
  { value: "Entertainment", label: "🎬 Entertainment" },
  { value: "Health", label: "🏥 Health" },
  { value: "Education", label: "📚 Education" },
  { value: "Travel", label: "✈️ Travel" },
  { value: "Investment", label: "📈 Investment" },
  { value: "Other", label: "📦 Other" },
];
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

                {/* Expense Title */}
<div>

  <label className="block mb-2 text-sm font-medium text-gray-700">

    Expense Title

  </label>

  <input
    type="text"
    placeholder="Enter expense title"
    value={title}
    onChange={(e) =>
      setTitle(
        e.target.value
      )
    }
    className="w-full border border-gray-300 rounded-2xl px-5 py-3"
    required
  />

</div>

{/* Category */}
<div>

  <label className="block mb-2 text-sm font-medium text-gray-700">

    Category

  </label>

  <Select
    options={categoryOptions}
    placeholder="Select Expense Category"
    value={
      categoryOptions.find(
        (item) =>
          item.value === category
      )
    }
    onChange={(selected) =>
      setCategory(selected.value)
    }
    isSearchable={false}
    styles={{

      control: (base, state) => ({

        ...base,

        minHeight: "56px",

        borderRadius: "9999px",

        paddingLeft: "12px",

        border: state.isFocused
          ? "2px solid #DC2626"
          : "1px solid #D1D5DB",

        boxShadow: state.isFocused
          ? "0 0 0 4px rgba(220,38,38,0.10)"
          : "none",

        cursor: "pointer",

        transition: "all .25s ease",

        "&:hover": {

          border: "1px solid #DC2626",

        },

      }),

      placeholder: (base) => ({

        ...base,

        color: "#9CA3AF",

        fontSize: "16px",

      }),

      singleValue: (base) => ({

        ...base,

        color: "#111827",

        fontWeight: 500,

      }),

      menu: (base) => ({

        ...base,

        borderRadius: "20px",

        overflow: "hidden",

        marginTop: "10px",

        boxShadow:
          "0 15px 40px rgba(0,0,0,.12)",

        border: "1px solid #E5E7EB",

      }),

      menuList: (base) => ({

        ...base,

        padding: "8px",

      }),

      option: (base, state) => ({

        ...base,

        borderRadius: "14px",

        marginBottom: "4px",

        padding: "12px 16px",

        cursor: "pointer",

        backgroundColor: state.isSelected
          ? "#DC2626"
          : state.isFocused
          ? "#FEE2E2"
          : "#FFFFFF",

        color: state.isSelected
          ? "#FFFFFF"
          : "#111827",

        fontWeight: 500,

      }),

      indicatorSeparator: () => ({

        display: "none",

      }),

      dropdownIndicator: (base) => ({

        ...base,

        color: "#6B7280",

        paddingRight: "18px",

        "&:hover": {

          color: "#DC2626",

        },

      }),

    }}
  />

</div>

{/* Amount */}
<div>

  <label className="block mb-2 text-sm font-medium text-gray-700">

    Amount

  </label>

  <input
    type="number"
    placeholder="Enter amount"
    value={amount}
    onChange={(e) =>
      setAmount(
        e.target.value
      )
    }
    className="w-full border border-gray-300 rounded-2xl px-5 py-3"
    required
  />

</div>

{/* Date */}
<div>

  <label className="block mb-2 text-sm font-medium text-gray-700">

    Expense Date

  </label>

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

</div>

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