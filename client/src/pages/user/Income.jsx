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

const Income = () => {

  const [showModal,
    setShowModal] =
    useState(false);

  const [incomes,
    setIncomes] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [submitting,
    setSubmitting] =
    useState(false);

  const [source,
    setSource] =
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

  {
    value: "Salary",
    label: "💼 Salary",
  },

  {
    value: "Freelancing",
    label: "💻 Freelancing",
  },

  {
    value: "Business",
    label: "🏢 Business",
  },

  {
    value: "Investment",
    label: "📈 Investment",
  },

  {
    value: "Rental",
    label: "🏠 Rental Income",
  },

  {
    value: "Bonus",
    label: "🎁 Bonus",
  },

  {
    value: "Interest",
    label: "🏦 Interest",
  },

  {
    value: "Gift",
    label: "🎉 Gift",
  },

  {
    value: "Refund",
    label: "💸 Refund",
  },

  {
    value: "Other",
    label: "📦 Other",
  },

];

  // FETCH
  const fetchIncome =
    async () => {

      try {

        const { data } =
          await API.get(
            "/income"
          );

        setIncomes(data);

      } catch (error) {

        toast.error(
          "Failed to load income"
        );

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchIncome();

  }, []);

  // ADD
  const handleAddIncome =
    async (e) => {

      e.preventDefault();

      try {

        setSubmitting(true);

        await API.post(
          "/income",
          {
            source,
            category,
            amount,
            date,
          }
        );

        toast.success(
          "Income Added"
        );

        setShowModal(false);

        // REFRESH DATA
        await fetchIncome();

        // UPDATE NOTIFICATIONS
        window.dispatchEvent(
          new Event(
            "notificationUpdate"
          )
        );

        // RESET
        setSource("");

        setCategory("");

        setAmount("");

        setDate("");

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Failed to add income"
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
          `/income/${id}`
        );

        toast.success(
          "Income Deleted"
        );

        // REFRESH
        fetchIncome();

      } catch (error) {

        toast.error(
          "Failed to delete income"
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

            Income

          </h1>

          <p className="mt-2 text-gray-500">

            Manage and track all your income.

          </p>

        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-green-600 text-white px-6 py-3 rounded-2xl flex items-center gap-3 hover:bg-green-700 transition w-fit"
        >

          <FaPlus />

          Add Income

        </button>

      </div>

      {/* TABLE */}
      <div className="mt-8 bg-white rounded-3xl shadow-sm overflow-hidden">

        <div className="hidden md:grid grid-cols-5 bg-[#F5F7FF] p-5 font-semibold text-[#0B132B]">

          <h3>Source</h3>

          <h3>Category</h3>

          <h3>Amount</h3>

          <h3>Date</h3>

          <h3 className="text-center">

            Actions

          </h3>

        </div>

        <div>

          {
            incomes.length === 0 ? (

              <div className="p-10 text-center text-gray-500">

                No income found

              </div>

            ) : (

              incomes.map(
                (item) => (

                  <div
                    key={item._id}
                    className="grid md:grid-cols-5 gap-4 p-5 border-t border-gray-100 items-center"
                  >

                    <div>

                      <p className="font-semibold text-[#0B132B] break-words">

                        {item.source}

                      </p>

                    </div>

                    <div>

                      <p className="text-gray-500 break-words">

                        {item.category}

                      </p>

                    </div>

                    <div>

                      <p className="font-bold text-green-600">

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

                  Add Income

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
                  handleAddIncome
                }
                className="mt-8 space-y-5"
              >

                {/* Income Source */}

<div>

<label className="block mb-2 text-sm font-medium text-gray-700">

Income Source

</label>

<input
type="text"
placeholder="Enter income source"
value={source}
onChange={(e)=>
setSource(
e.target.value
)}
className="w-full border border-gray-300 rounded-full px-6 py-3 outline-none focus:border-green-600"
/>

</div>


{/* Category */}

<div>

<label className="block mb-2 text-sm font-medium text-gray-700">

Category

</label>

<Select

options={categoryOptions}

placeholder="Select Income Category"

value={
categoryOptions.find(
(item)=>
item.value===category
)
}

onChange={(selected)=>
setCategory(
selected.value
)
}

isSearchable={false}

styles={{

control:(base,state)=>({

...base,

minHeight:"56px",

borderRadius:"9999px",

paddingLeft:"12px",

border:state.isFocused
?"2px solid #16A34A"
:"1px solid #D1D5DB",

boxShadow:state.isFocused
?"0 0 0 4px rgba(22,163,74,.10)"
:"none",

transition:"all .25s",

cursor:"pointer",

"&:hover":{

border:"1px solid #16A34A",

},

}),

placeholder:(base)=>({

...base,

color:"#9CA3AF",

}),

singleValue:(base)=>({

...base,

fontWeight:500,

color:"#111827",

}),

menu:(base)=>({

...base,

borderRadius:"20px",

overflow:"hidden",

marginTop:"10px",

border:"1px solid #E5E7EB",

boxShadow:"0 15px 40px rgba(0,0,0,.12)",

}),

menuList:(base)=>({

...base,

padding:"8px",

}),

option:(base,state)=>({

...base,

borderRadius:"14px",

marginBottom:"4px",

padding:"12px 16px",

cursor:"pointer",

backgroundColor:state.isSelected
?"#16A34A"
:state.isFocused
?"#DCFCE7"
:"#FFFFFF",

color:state.isSelected
?"white"
:"#111827",

fontWeight:500,

}),

indicatorSeparator:()=>({

display:"none",

}),

dropdownIndicator:(base)=>({

...base,

color:"#6B7280",

paddingRight:"18px",

"&:hover":{

color:"#16A34A",

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

onChange={(e)=>
setAmount(
e.target.value
)
}

className="w-full border border-gray-300 rounded-full px-6 py-3 outline-none focus:border-green-600"

/>

</div>


{/* Income Date */}

<div>

<label className="block mb-2 text-sm font-medium text-gray-700">

Income Date

</label>

<input

type="date"

value={date}

onChange={(e)=>
setDate(
e.target.value
)
}

className="w-full border border-gray-300 rounded-full px-6 py-3 outline-none focus:border-green-600"

/>

</div>

                <button
                  disabled={submitting}
                  className="w-full bg-green-600 text-white py-3 rounded-2xl hover:bg-green-700 transition disabled:opacity-70"
                >

                  {
                    submitting
                      ? "Saving..."
                      : "Save Income"
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

export default Income;