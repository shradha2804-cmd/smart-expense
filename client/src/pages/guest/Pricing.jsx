import React from "react";

const plans = [
  {
    title: "Basic",
    price: "Free",
    features: [
      "Expense Tracking",
      "Income Tracking",
      "Basic Reports",
    ],
  },

  {
    title: "Pro",
    price: "₹499/mo",
    features: [
      "Advanced Analytics",
      "Unlimited Reports",
      "Budget Planning",
    ],
  },

  {
    title: "Enterprise",
    price: "Custom",
    features: [
      "Team Access",
      "Cloud Backup",
      "Priority Support",
    ],
  },
];

const Pricing = () => {
  return (
    <section className="bg-[#F5F7FF] py-20 min-h-screen">

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="text-center">

          <h1 className="text-4xl md:text-5xl font-bold text-[#0B132B]">
            Pricing Plans
          </h1>

          <p className="mt-5 text-gray-500 text-lg">
            Choose the perfect plan for your needs.
          </p>

        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">

          {plans.map((plan, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-sm"
            >

              <h2 className="text-3xl font-bold text-[#0B132B]">
                {plan.title}
              </h2>

              <h3 className="mt-6 text-5xl font-bold text-blue-600">
                {plan.price}
              </h3>

              <ul className="mt-8 space-y-4 text-gray-500">

                {plan.features.map((item, idx) => (

                  <li key={idx}>
                    • {item}
                  </li>

                ))}

              </ul>

              <button className="mt-10 w-full bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 transition">

                Choose Plan

              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Pricing;