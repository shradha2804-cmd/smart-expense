import React, {
  useEffect,
  useState,
} from "react";

import {
  FaBars,
  FaBell,
} from "react-icons/fa";

import {
  useNavigate,
} from "react-router-dom";

import API from "../../utils/api";

const AdminNavbar = ({
  setSidebarOpen,
}) => {

  const navigate =
    useNavigate();

  const [adminInfo,
    setAdminInfo] =
    useState(null);

  // FETCH ADMIN PROFILE
  const fetchAdminProfile =
    async () => {

      try {

        const { data } =
          await API.get(
            "/users/profile"
          );

        setAdminInfo(data);

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchAdminProfile();

  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-30 overflow-hidden">

      {/* LEFT */}
      <div className="flex items-center gap-4 min-w-0">

        <button
          onClick={() =>
            setSidebarOpen(true)
          }
          className="lg:hidden text-xl text-[#2E1065] shrink-0"
        >

          <FaBars />

        </button>

        <div className="min-w-0">

          <h1 className="text-xl md:text-2xl font-bold text-[#2E1065] break-words">

            Admin Dashboard

          </h1>

          <p className="text-xs md:text-sm text-gray-500">

            Welcome back admin

          </p>

        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 shrink-0">

        {/* NOTIFICATION */}
        <button
          onClick={() =>
            navigate(
              "/admin/notifications"
            )
          }
          className="relative text-xl text-gray-600"
        >

          <FaBell />

          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full"></span>

        </button>

        {/* PROFILE */}
        {
          adminInfo?.profileImage ? (

            <img
              src={
                adminInfo.profileImage
              }
              alt=""
              className="h-10 w-10 rounded-full object-cover border-2 border-purple-100"
            />

          ) : (

            <div className="h-10 w-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold uppercase text-sm">

              {
                adminInfo?.name?.charAt(
                  0
                )
              }

            </div>

          )
        }

      </div>

    </header>
  );
};

export default AdminNavbar;