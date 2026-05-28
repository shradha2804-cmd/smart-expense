import React, {
  useState,
} from "react";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

import toast from "react-hot-toast";

import API from "../../utils/api";

const Contact = () => {

  const [name,
    setName] =
    useState("");

  const [email,
    setEmail] =
    useState("");

  const [subject,
    setSubject] =
    useState("");

  const [message,
    setMessage] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  // SEND MESSAGE
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await API.post(
          "/contact",
          {
            name,
            email,
            subject,
            message,
          }
        );

        toast.success(
          "Message sent successfully"
        );

        // RESET
        setName("");

        setEmail("");

        setSubject("");

        setMessage("");

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Failed to send message"
        );

      } finally {

        setLoading(false);

      }

    };

  return (
    <section className="bg-[#F5F7FF] overflow-hidden">

      {/* HERO */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 text-center">

        <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-xl text-sm md:text-base">

          Contact Finora

        </div>

        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold text-[#0B132B] leading-tight">

          Let’s Talk About

          <span className="block text-blue-600">

            Smart Finance

          </span>

        </h1>

        <p className="mt-8 text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">

          Have questions, suggestions or support needs?
          Our team is here to help you anytime.

        </p>

      </div>

      {/* CONTACT SECTION */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20 grid lg:grid-cols-2 gap-14">

        {/* LEFT SIDE */}
        <div className="space-y-6">

          {/* CARD 1 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm flex items-start gap-5">

            <div className="bg-blue-100 text-blue-600 h-14 w-14 rounded-2xl flex items-center justify-center text-2xl shrink-0">

              <FaEnvelope />

            </div>

            <div>

              <h3 className="text-2xl font-bold text-[#0B132B]">

                Email Support

              </h3>

              <p className="mt-2 text-gray-500">

                support@finora.com

              </p>

            </div>

          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm flex items-start gap-5">

            <div className="bg-green-100 text-green-600 h-14 w-14 rounded-2xl flex items-center justify-center text-2xl shrink-0">

              <FaPhoneAlt />

            </div>

            <div>

              <h3 className="text-2xl font-bold text-[#0B132B]">

                Phone Number

              </h3>

              <p className="mt-2 text-gray-500">

                +91 9876543210

              </p>

            </div>

          </div>

          {/* CARD 3 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm flex items-start gap-5">

            <div className="bg-red-100 text-red-500 h-14 w-14 rounded-2xl flex items-center justify-center text-2xl shrink-0">

              <FaMapMarkerAlt />

            </div>

            <div>

              <h3 className="text-2xl font-bold text-[#0B132B]">

                Office Location

              </h3>

              <p className="mt-2 text-gray-500">

                Bangalore, Karnataka, India

              </p>

            </div>

          </div>

          {/* CARD 4 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm flex items-start gap-5">

            <div className="bg-yellow-100 text-yellow-500 h-14 w-14 rounded-2xl flex items-center justify-center text-2xl shrink-0">

              <FaClock />

            </div>

            <div>

              <h3 className="text-2xl font-bold text-[#0B132B]">

                Working Hours

              </h3>

              <p className="mt-2 text-gray-500">

                Monday - Saturday | 9AM - 6PM

              </p>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white rounded-[35px] shadow-sm p-6 md:p-8">

          <h2 className="text-3xl md:text-4xl font-bold text-[#0B132B]">

            Send Message

          </h2>

          <p className="mt-4 text-gray-500">

            Fill out the form and our team will contact you soon.

          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              required
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-600"
            />

            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              required
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-600"
            />

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) =>
                setSubject(
                  e.target.value
                )
              }
              required
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-600"
            />

            <textarea
              rows="6"
              placeholder="Your Message"
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              required
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-600 resize-none"
            />

            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl hover:bg-blue-700 transition disabled:opacity-70"
            >

              {
                loading
                  ? "Sending..."
                  : "Send Message"
              }

            </button>

          </form>

        </div>

      </div>

    </section>
  );
};

export default Contact;