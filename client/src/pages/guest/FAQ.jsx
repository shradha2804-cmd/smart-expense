import React from "react";

const faqs = [
  {
    question: "Is Smart Expense TRacker free to use?",
    answer: "Yes, Smart Expense TRacker offers a free basic plan.",
  },

  {
    question: "Is my data secure?",
    answer: "Yes, your data is encrypted and secure.",
  },

  {
    question: "Can I track income and expenses?",
    answer: "Yes, Smart Expense TRacker supports complete financial tracking.",
  },
];

const FAQ = () => {
  return (
    <section className="bg-[#F5F7FF] py-20 min-h-screen">

      <div className="max-w-4xl mx-auto px-4 md:px-6">

        <div className="text-center">

          <h1 className="text-4xl md:text-5xl font-bold text-[#0B132B]">
            Frequently Asked Questions
          </h1>

        </div>

        <div className="mt-16 space-y-6">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-sm"
            >

              <h2 className="text-2xl font-bold text-[#0B132B]">

                {faq.question}

              </h2>

              <p className="mt-4 text-gray-500 leading-relaxed">

                {faq.answer}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default FAQ;