import React from "react";

import {
  FaBars,
  FaBell,
} from "react-icons/fa";

import {
  useNavigate,
} from "react-router-dom";

const AdminNavbar = ({
  setSidebarOpen,
}) => {

  const navigate =
    useNavigate();

  const adminInfo =
    JSON.parse(
      localStorage.getItem(
        "adminInfo"
      )
    );

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-30">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        <button
          onClick={() =>
            setSidebarOpen(true)
          }
          className="lg:hidden text-xl text-[#2E1065]"
        >

          <FaBars />

        </button>

        <div>

          <h1 className="text-xl md:text-2xl font-bold text-[#2E1065]">

            Admin Dashboard

          </h1>

          <p className="text-xs md:text-sm text-gray-500">

            Welcome back admin

          </p>

        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

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
        <div className="h-10 w-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold uppercase text-sm">

          {
            adminInfo?.name?.charAt(
              0
            )
          }

        </div>

      </div>

    </header>
  );
};

export default AdminNavbar;