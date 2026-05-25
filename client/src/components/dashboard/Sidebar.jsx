import React from "react";

import {
  NavLink,
} from "react-router-dom";

import {
  FaTimes,
  FaChartPie,
  FaWallet,
  FaMoneyBillWave,
  FaCog,
} from "react-icons/fa";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {

  const navStyle = ({ isActive }) =>
    isActive
      ? "bg-blue-600 text-white"
      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600";

  return (
    <>
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        ></div>
      )}

      {/* SIDEBAR */}
      <aside
        className={`
        fixed lg:static top-0 left-0 z-50
        h-screen w-[280px]
        bg-white border-r border-gray-200
        p-6 transition-all duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >

        {/* TOP */}
        <div className="flex items-center justify-between">

          <h1 className="text-3xl font-bold text-blue-600">
            Finora
          </h1>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-2xl"
          >
            <FaTimes />
          </button>

        </div>

        {/* MENU */}
        <div className="mt-10 flex flex-col gap-3">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${navStyle({ isActive })} flex items-center gap-4 px-5 py-4 rounded-2xl transition`
            }
          >

            <FaChartPie />

            Dashboard

          </NavLink>

          <NavLink
            to="/expenses"
            className={({ isActive }) =>
              `${navStyle({ isActive })} flex items-center gap-4 px-5 py-4 rounded-2xl transition`
            }
          >

            <FaWallet />

            Expenses

          </NavLink>

          <NavLink
            to="/income"
            className={({ isActive }) =>
              `${navStyle({ isActive })} flex items-center gap-4 px-5 py-4 rounded-2xl transition`
            }
          >

            <FaMoneyBillWave />

            Income

          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `${navStyle({ isActive })} flex items-center gap-4 px-5 py-4 rounded-2xl transition`
            }
          >

            <FaCog />

            Settings

          </NavLink>

        </div>

      </aside>
    </>
  );
};

export default Sidebar;