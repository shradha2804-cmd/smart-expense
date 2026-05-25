import React from "react";

const Settings = () => {
  return (
    <section>

      {/* TOP */}
      <div>

        <h1 className="text-3xl font-bold text-[#0B132B]">
          Settings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your profile and preferences.
        </p>

      </div>

      {/* PROFILE CARD */}
      <div className="mt-8 bg-white rounded-3xl shadow-sm p-6 md:p-8">

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">

          {/* PROFILE IMAGE */}
          <div className="h-24 w-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">

            S

          </div>

          {/* INFO */}
          <div>

            <h2 className="text-2xl font-bold text-[#0B132B]">
              Sahil Kolekar
            </h2>

            <p className="mt-2 text-gray-500">
              sahil@example.com
            </p>

          </div>

        </div>

        {/* FORM */}
        <form className="mt-10 grid md:grid-cols-2 gap-6">

          {/* NAME */}
          <div>

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter full name"
              className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-blue-600"
            />

          </div>

          {/* EMAIL */}
          <div>

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-blue-600"
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="block mb-2 text-sm font-medium text-gray-700">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-blue-600"
            />

          </div>

          {/* PHONE */}
          <div>

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Phone Number
            </label>

            <input
              type="text"
              placeholder="Enter phone number"
              className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-blue-600"
            />

          </div>

          {/* BUTTON */}
          <div className="md:col-span-2">

            <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl hover:bg-blue-700 transition">

              Save Changes

            </button>

          </div>

        </form>

      </div>

    </section>
  );
};

export default Settings;