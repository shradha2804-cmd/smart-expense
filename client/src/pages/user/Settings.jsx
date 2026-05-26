import React, {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import API from "../../utils/api";

import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Settings = () => {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
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
  const fetchProfile = async () => {

    try {

      const { data } =
        await API.get(
          "/users/profile"
        );

      setName(data.name);

      setEmail(data.email);

      setPhone(data.phone || "");

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
  const uploadImage = async (
    e
  ) => {

    const file =
      e.target.files[0];

    if (!file) return;

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    formData.append(
      "upload_preset",
      "finora_upload"
    );

    try {

      setLoadingImage(true);

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/demo/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data =
        await res.json();

      setProfileImage(
        data.secure_url
      );

      toast.success(
        "Image Uploaded"
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

        const { data } =
          await API.put(
            "/users/profile",
            {
              name,
              phone,
              profileImage,
            }
          );

        localStorage.setItem(
          "userInfo",
          JSON.stringify(data)
        );

        toast.success(
          "Profile Updated"
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

        <h1 className="text-3xl font-bold text-[#0B132B]">

          Settings

        </h1>

        <p className="mt-2 text-gray-500">

          Manage your profile & security

        </p>

      </div>

      {/* PROFILE BOX */}
      <div className="mt-8 bg-white rounded-3xl shadow-sm p-6 md:p-8">

        <h2 className="text-2xl font-bold text-[#0B132B]">

          Update Profile

        </h2>

        <form
          onSubmit={handleProfileUpdate}
          className="mt-8"
        >

          {/* PROFILE */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">

            {/* IMAGE */}
            <div>

              {profileImage ? (

                <img
                  src={profileImage}
                  alt=""
                  className="h-28 w-28 rounded-full object-cover border-4 border-blue-100"
                />

              ) : (

                <div className="h-28 w-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-5xl font-bold uppercase">

                  {name?.charAt(0)}

                </div>

              )}

            </div>

            {/* UPLOAD */}
            <div className="flex-1">

              <label className="block mb-3 text-sm font-medium text-gray-700">

                Upload Profile Picture

              </label>

              <input
                type="file"
                accept="image/*"
                onChange={uploadImage}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3"
              />

              {loadingImage && (

                <p className="mt-3 text-blue-600 text-sm">

                  Uploading image...

                </p>

              )}

            </div>

          </div>

          {/* FORM */}
          <div className="grid md:grid-cols-2 gap-6">

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

                Email Address

              </label>

              <input
                type="email"
                value={email}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded-2xl px-5 py-3 cursor-not-allowed"
              />

            </div>

            {/* PHONE */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700">

                Phone Number

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

          </div>

          <button className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-2xl hover:bg-blue-700 transition">

            Update Profile

          </button>

        </form>

      </div>

      {/* PASSWORD BOX */}
      <div className="mt-8 bg-white rounded-3xl shadow-sm p-6 md:p-8">

        <h2 className="text-2xl font-bold text-[#0B132B]">

          Change Password

        </h2>

        <form
          onSubmit={handlePasswordChange}
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
                className="w-full border border-gray-300 rounded-2xl px-5 py-3 pr-14 outline-none focus:border-blue-600"
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

                {showCurrent
                  ? <FaEyeSlash />
                  : <FaEye />}

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
                className="w-full border border-gray-300 rounded-2xl px-5 py-3 pr-14 outline-none focus:border-blue-600"
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

                {showNew
                  ? <FaEyeSlash />
                  : <FaEye />}

              </button>

            </div>

          </div>

          {/* BUTTON */}
          <div className="md:col-span-2">

            <button className="bg-red-500 text-white px-8 py-3 rounded-2xl hover:bg-red-600 transition">

              Change Password

            </button>

          </div>

        </form>

      </div>

    </section>
  );
};

export default Settings;