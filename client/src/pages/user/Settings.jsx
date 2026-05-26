import React, {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import API from "../../utils/api";

const Settings = () => {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [currentPassword,
    setCurrentPassword] =
    useState("");

  const [newPassword,
    setNewPassword] =
    useState("");

  // FETCH PROFILE
  const fetchProfile = async () => {

    try {

      const { data } =
        await API.get(
          "/users/profile"
        );

      setName(data.name);

      setEmail(data.email);

      setPhone(data.phone || "");

    } catch (error) {

      toast.error(
        "Failed to load profile"
      );

    }

  };

  useEffect(() => {

    fetchProfile();

  }, []);

  // UPDATE PROFILE
  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      const { data } =
        await API.put(
          "/users/profile",
          {
            name,
            email,
            phone,
            currentPassword,
            newPassword,
          }
        );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      toast.success(
        "Profile Updated"
      );

      setCurrentPassword("");

      setNewPassword("");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to update profile"
      );

    }

  };

  return (
    <section>

      {/* TOP */}
      <div>

        <h1 className="text-3xl font-bold text-[#0B132B]">
          Settings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your profile & security
        </p>

      </div>

      {/* CARD */}
      <div className="mt-8 bg-white rounded-3xl shadow-sm p-6 md:p-8">

        {/* PROFILE */}
        <div className="flex items-center gap-5">

          <div className="h-24 w-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold uppercase">

            {name?.charAt(0)}

          </div>

          <div>

            <h2 className="text-2xl font-bold text-[#0B132B]">

              {name}

            </h2>

            <p className="mt-2 text-gray-500">

              {email}

            </p>

          </div>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleUpdate}
          className="mt-10 grid md:grid-cols-2 gap-6"
        >

          {/* NAME */}
          <div>

            <label className="block mb-2 text-sm font-medium text-gray-700">

              Full Name

            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
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
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-blue-600"
            />

          </div>

          {/* PHONE */}
          <div>

            <label className="block mb-2 text-sm font-medium text-gray-700">

              Phone

            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-blue-600"
            />

          </div>

          {/* CURRENT PASSWORD */}
          <div>

            <label className="block mb-2 text-sm font-medium text-gray-700">

              Current Password

            </label>

            <input
              type="password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(
                  e.target.value
                )
              }
              placeholder="Enter current password"
              className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-blue-600"
            />

          </div>

          {/* NEW PASSWORD */}
          <div className="md:col-span-2">

            <label className="block mb-2 text-sm font-medium text-gray-700">

              New Password

            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              placeholder="Enter new password"
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