import React, {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import API from "../../utils/api";

import {
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
} from "react-icons/fa";

const AdminSettings = () => {

  const [name,
    setName] =
    useState("");

  const [email,
    setEmail] =
    useState("");

  const [profileImage,
    setProfileImage] =
    useState("");

  const [loadingImage,
    setLoadingImage] =
    useState(false);

  const [currentPassword,
    setCurrentPassword] =
    useState("");

  const [newPassword,
    setNewPassword] =
    useState("");

  const [showCurrent,
    setShowCurrent] =
    useState(false);

  const [showNew,
    setShowNew] =
    useState(false);

  // FETCH PROFILE
  const fetchProfile =
    async () => {

      try {

        const { data } =
          await API.get(
            "/users/profile"
          );

        setName(data.name);

        setEmail(data.email);

        setProfileImage(
          data.profileImage || ""
        );

      } catch (error) {

        toast.error(
          "Failed to load profile"
        );

      }

    };

  useEffect(() => {

    fetchProfile();

  }, []);

  // IMAGE UPLOAD
  const uploadImage =
    async (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      try {

        setLoadingImage(true);

        const formData =
          new FormData();

        formData.append(
          "profileImage",
          file
        );

        const { data } =
          await API.put(
            "/users/profile",
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        setProfileImage(
          data.profileImage
        );

        toast.success(
          "Profile image updated"
        );

        // UPDATE NAVBAR
        window.dispatchEvent(
          new Event(
            "profileUpdated"
          )
        );

      } catch (error) {

        toast.error(
          "Image upload failed"
        );

      } finally {

        setLoadingImage(false);

      }

    };

  // UPDATE PROFILE
  const handleProfileUpdate =
    async (e) => {

      e.preventDefault();

      try {

        await API.put(
          "/users/profile",
          {
            name,
            profileImage,
          }
        );

        toast.success(
          "Profile Updated"
        );

        // REFRESH
        fetchProfile();

        // UPDATE NAVBAR
        window.dispatchEvent(
          new Event(
            "profileUpdated"
          )
        );

      } catch (error) {

        toast.error(
          "Failed to update profile"
        );

      }

    };

  // CHANGE PASSWORD
  const handlePasswordChange =
    async (e) => {

      e.preventDefault();

      try {

        await API.put(
          "/users/profile",
          {
            currentPassword,
            newPassword,
          }
        );

        toast.success(
          "Password Changed"
        );

        setCurrentPassword("");

        setNewPassword("");

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Failed to change password"
        );

      }

    };

  return (
    <section>

      {/* TOP */}
      <div>

        <h1 className="text-2xl md:text-4xl font-bold text-[#2E1065] break-words">

          Admin Settings

        </h1>

        <p className="mt-2 text-gray-500">

          Manage your admin profile and security

        </p>

      </div>

      {/* PROFILE */}
      <div className="mt-8 bg-white rounded-3xl shadow-sm p-6 md:p-8 overflow-hidden">

        <div className="flex items-center gap-4">

          <div className="h-16 w-16 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-3xl shrink-0">

            <FaShieldAlt />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-[#2E1065]">

              Admin Profile

            </h2>

            <p className="text-gray-500 mt-1">

              Update your admin information

            </p>

          </div>

        </div>

        <form
          onSubmit={
            handleProfileUpdate
          }
          className="mt-8"
        >

          {/* IMAGE */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">

            {/* HIDDEN */}
            <input
              type="file"
              accept="image/*"
              id="adminProfileUpload"
              onChange={uploadImage}
              className="hidden"
            />

            {/* IMAGE */}
            <div
              onClick={() =>
                document
                  .getElementById(
                    "adminProfileUpload"
                  )
                  .click()
              }
              className="cursor-pointer relative group"
            >

              {
                profileImage ? (

                  <img
                    src={
                      profileImage
                    }
                    alt=""
                    className="h-28 w-28 rounded-full object-cover border-4 border-purple-100"
                  />

                ) : (

                  <div className="h-28 w-28 rounded-full bg-purple-600 text-white flex items-center justify-center text-5xl font-bold uppercase">

                    {
                      name?.charAt(
                        0
                      )
                    }

                  </div>

                )
              }

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-sm font-medium">

                Change

              </div>

            </div>

            {/* INFO */}
            <div>

              <h3 className="text-xl font-semibold text-[#2E1065] break-words">

                {name}

              </h3>

              <p className="mt-2 text-gray-500">

                Click image to change profile photo

              </p>

              {
                loadingImage && (

                  <p className="mt-2 text-purple-600 text-sm">

                    Uploading image...

                  </p>

                )
              }

            </div>

          </div>

          {/* FORM */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* NAME */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700">

                Admin Name

              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-purple-600"
              />

            </div>

            {/* EMAIL */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700">

                Email Address

              </label>

              <input
                type="email"
                value={email}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded-2xl px-5 py-3 cursor-not-allowed"
              />

            </div>

          </div>

          {/* BUTTON */}
          <button className="mt-8 bg-purple-600 hover:bg-purple-700 transition text-white px-8 py-3 rounded-2xl">

            Update Profile

          </button>

        </form>

      </div>

      {/* PASSWORD */}
      <div className="mt-8 bg-white rounded-3xl shadow-sm p-6 md:p-8 overflow-hidden">

        <h2 className="text-2xl font-bold text-[#2E1065]">

          Change Password

        </h2>

        <form
          onSubmit={
            handlePasswordChange
          }
          className="mt-8 grid md:grid-cols-2 gap-6"
        >

          {/* CURRENT */}
          <div>

            <label className="block mb-2 text-sm font-medium text-gray-700">

              Current Password

            </label>

            <div className="relative">

              <input
                type={
                  showCurrent
                    ? "text"
                    : "password"
                }
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 rounded-2xl px-5 py-3 pr-14 outline-none focus:border-purple-600"
              />

              <button
                type="button"
                onClick={() =>
                  setShowCurrent(
                    !showCurrent
                  )
                }
                className="absolute top-1/2 -translate-y-1/2 right-5 text-gray-500"
              >

                {
                  showCurrent
                    ? <FaEyeSlash />
                    : <FaEye />
                }

              </button>

            </div>

          </div>

          {/* NEW */}
          <div>

            <label className="block mb-2 text-sm font-medium text-gray-700">

              New Password

            </label>

            <div className="relative">

              <input
                type={
                  showNew
                    ? "text"
                    : "password"
                }
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 rounded-2xl px-5 py-3 pr-14 outline-none focus:border-purple-600"
              />

              <button
                type="button"
                onClick={() =>
                  setShowNew(
                    !showNew
                  )
                }
                className="absolute top-1/2 -translate-y-1/2 right-5 text-gray-500"
              >

                {
                  showNew
                    ? <FaEyeSlash />
                    : <FaEye />
                }

              </button>

            </div>

          </div>

          {/* BUTTON */}
          <div className="md:col-span-2">

            <button className="bg-red-500 hover:bg-red-600 transition text-white px-8 py-3 rounded-2xl">

              Change Password

            </button>

          </div>

        </form>

      </div>

    </section>
  );
};

export default AdminSettings;