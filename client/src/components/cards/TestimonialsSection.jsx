import React from "react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    review:
      "Smart Tracker completely changed the way I manage my monthly expenses.",
  },

  {
    name: "Priya Patel",
    role: "Designer",
    review:
      "The analytics dashboard is clean, beautiful and very useful.",
  },

  {
    name: "Amit Kumar",
    role: "Entrepreneur",
    review:
      "Best finance tracker I have used. Simple and powerful.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* HEADING */}
        <div className="text-center mb-16">

          <h2 className="text-3xl md:text-5xl font-bold text-[#0B132B]">
            What Users Say
          </h2>

          <p className="mt-5 text-gray-500 text-base md:text-lg">
            Trusted by thousands of happy users.
          </p>

        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (

            <div
              key={index}
              className="bg-[#F5F7FF] p-8 rounded-3xl shadow-sm"
            >

              <p className="text-gray-600 leading-relaxed">
                "{item.review}"
              </p>

              <div className="mt-6">

                <h3 className="text-xl font-bold text-[#0B132B]">
                  {item.name}
                </h3>

                <p className="text-gray-500">
                  {item.role}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default TestimonialsSection;