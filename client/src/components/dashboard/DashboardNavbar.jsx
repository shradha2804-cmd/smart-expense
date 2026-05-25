import React from "react";

import {
  FaBars,
  FaBell,
} from "react-icons/fa";

const DashboardNavbar = ({
  setSidebarOpen,
}) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-2xl text-gray-700"
        >

          <FaBars />

        </button>

        <h2 className="text-2xl font-bold text-[#0B132B]">
          Dashboard
        </h2>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        <button className="relative">

          <FaBell className="text-2xl text-gray-600" />

          <span className="absolute -top-2 -right-2 h-3 w-3 rounded-full bg-red-500"></span>

        </button>

        <div className="h-11 w-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          S
        </div>

      </div>

    </header>
  );
};

export default DashboardNavbar;