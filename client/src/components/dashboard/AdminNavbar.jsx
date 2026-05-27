import React from "react";

import {
  FaBars,
  FaBell,
} from "react-icons/fa";

const AdminNavbar = ({
  setSidebarOpen,
}) => {

  const adminInfo =
    JSON.parse(
      localStorage.getItem(
        "adminInfo"
      )
    );

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 flex items-center justify-between">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        <button
          onClick={() =>
            setSidebarOpen(true)
          }
          className="lg:hidden text-2xl text-[#2E1065]"
        >

          <FaBars />

        </button>

        <div>

          <h1 className="text-2xl font-bold text-[#2E1065]">

            Admin Dashboard

          </h1>

          <p className="text-sm text-gray-500">

            Welcome back admin

          </p>

        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        {/* NOTIFICATION */}
        <button className="relative text-2xl text-gray-600">

          <FaBell />

          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>

        </button>

        {/* PROFILE */}
        <div className="h-12 w-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg uppercase">

          {adminInfo?.name?.charAt(
            0
          )}

        </div>

      </div>

    </header>
  );
};

export default AdminNavbar;