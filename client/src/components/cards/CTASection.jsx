import React from "react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
    const navigate = useNavigate();
  return (
    <section className="py-20 bg-[#0B132B]">

      <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">

        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">

          Start Managing Your
          Finances Smarter Today

        </h2>

        <p className="mt-6 text-gray-300 text-lg">

          Join thousands of users using Smart Tracker to
          track expenses and save money.

        </p>

        <button 
          onClick={() => navigate("/register")}
          className="mt-10 bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg hover:bg-blue-700 transition"
        >

          Get Started Free

        </button>

      </div>

    </section>
  );
};

export default CTASection;