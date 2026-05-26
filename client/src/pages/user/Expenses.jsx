import React, {
  useEffect,
  useState,
} from "react";

import {
  FaPlus,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

import toast from "react-hot-toast";

import API from "../../utils/api";

const Expenses = () => {

  const [showModal, setShowModal] = useState(false);

  const [expenses, setExpenses] = useState([]);

  const [title, setTitle] = useState("");

  const [category, setCategory] = useState("");

  const [amount, setAmount] = useState("");

  const [date, setDate] = useState("");

  // FETCH EXPENSES
  const fetchExpenses = async () => {

    try {

      const { data } = await API.get(
        "/expenses"
      );

      setExpenses(data);

    } catch (error) {

      toast.error(
        "Failed to load expenses"
      );

    }

  };

  useEffect(() => {

    fetchExpenses();

  }, []);

  // ADD EXPENSE
  const handleAddExpense = async (e) => {

    e.preventDefault();

    try {

      await API.post("/expenses", {
        title,
        category,
        amount,
        date,
      });
toast.success(
  "Expense Added"
);

setShowModal(false);

fetchExpenses();

// UPDATE NOTIFICATIONS LIVE
const userInfo = JSON.parse(
  localStorage.getItem(
    "userInfo"
  )
);

userInfo.notifications.unshift({
  message:
    `Expense added: ₹${amount} for ${title}`,
  read: false,
  createdAt: new Date(),
});

localStorage.setItem(
  "userInfo",
  JSON.stringify(userInfo)
);

// UPDATE RED DOT
window.dispatchEvent(
  new Event(
    "notificationUpdate"
  )
);
      setTitle("");
      setCategory("");
      setAmount("");
      setDate("");

    } catch (error) {

      toast.error(
        "Failed to add expense"
      );

    }

  };

  // DELETE EXPENSE
  const handleDelete = async (id) => {

    try {

      await API.delete(
        `/expenses/${id}`
      );

      toast.success(
        "Expense Deleted"
      );

      fetchExpenses();

    } catch (error) {

      toast.error(
        "Failed to delete expense"
      );

    }

  };

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
          <h3 className="text-center">
            Actions
          </h3>

        </div>

        {/* BODY */}
        <div>

          {expenses.length === 0 ? (

            <div className="p-10 text-center text-gray-500">

              No expenses found

            </div>

          ) : (

            expenses.map((item) => (

              <div
                key={item._id}
                className="grid md:grid-cols-5 gap-4 p-5 border-t border-gray-100 items-center"
              >

                {/* TITLE */}
                <div>

                  <p className="font-semibold text-[#0B132B]">
                    {item.title}
                  </p>

                </div>

                {/* CATEGORY */}
                <div>

                  <p className="text-gray-500">
                    {item.category}
                  </p>

                </div>

                {/* AMOUNT */}
                <div>

                  <p className="font-bold text-red-500">

                    ₹{item.amount}

                  </p>

                </div>

                {/* DATE */}
                <div>

                  <p className="text-gray-500">

                    {new Date(
                      item.date
                    ).toLocaleDateString()}

                  </p>

                </div>

                {/* ACTIONS */}
                <div className="flex items-center justify-start md:justify-center gap-4">

                  {/* EDIT */}
                  <button className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition">

                    <FaEdit />

                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() =>
                      handleDelete(item._id)
                    }
                    className="h-10 w-10 rounded-xl bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                  >

                    <FaTrash />

                  </button>

                </div>

              </div>

            ))

          )}

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
                onClick={() =>
                  setShowModal(false)
                }
                className="text-2xl text-gray-500"
              >
                ×
              </button>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleAddExpense}
              className="mt-8 space-y-5"
            >

              {/* TITLE */}
              <div>

                <label className="block mb-2 text-sm font-medium text-gray-700">

                  Expense Title

                </label>

                <input
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-blue-600"
                />

              </div>

              {/* CATEGORY */}
              <div>

                <label className="block mb-2 text-sm font-medium text-gray-700">

                  Category

                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-blue-600"
                >

                  <option value="">
                    Select Category
                  </option>

                  <option value="Food">
                    Food
                  </option>

                  <option value="Bills">
                    Bills
                  </option>

                  <option value="Entertainment">
                    Entertainment
                  </option>

                  <option value="Travel">
                    Travel
                  </option>

                  <option value="Shopping">
                    Shopping
                  </option>

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
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value)
                  }
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
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
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