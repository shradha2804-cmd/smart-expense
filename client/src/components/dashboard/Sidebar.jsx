import React from "react";

import {
  FaChartPie,
  FaWallet,
  FaMoneyBillWave,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {

  const navigate = useNavigate();

  // LOGOUT
  const logoutHandler = () => {

    localStorage.removeItem(
      "userInfo"
    );

    navigate("/login");

  };

  // MENU ITEMS
  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaChartPie />,
      path: "/dashboard",
    },

    {
      name: "Expenses",
      icon: <FaWallet />,
      path: "/expenses",
    },

    {
      name: "Income",
      icon: <FaMoneyBillWave />,
      path: "/income",
    },

    {
      name: "Settings",
      icon: <FaCog />,
      path: "/settings",
    },
  ];

  return (
    <>
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (

        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        ></div>

      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-screen w-[280px] bg-white border-r border-gray-200 flex flex-col justify-between transition-transform duration-300
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        {/* TOP */}
        <div>

          {/* LOGO */}
          <div className="px-7 py-7 border-b border-gray-100">

            <h1 className="text-4xl font-bold text-blue-600">

              Finora

            </h1>

          </div>

          {/* MENU */}
          <div className="p-6 space-y-3">

            {menuItems.map(
              (item, index) => (

                <NavLink
                  key={index}
                  to={item.path}
                  onClick={() =>
                    setSidebarOpen(false)
                  }
                  className={({
                    isActive,
                  }) =>
                    `flex items-center gap-4 px-6 py-4 rounded-2xl transition font-medium text-lg
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-600 hover:bg-blue-50"
                    }`
                  }
                >

                  <span className="text-xl">

                    {item.icon}

                  </span>

                  {item.name}

                </NavLink>

              )
            )}

          </div>

        </div>

        {/* LOGOUT */}
        <div className="p-6 border-t border-gray-100">

          <button
            onClick={logoutHandler}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition font-medium text-lg"
          >

            <FaSignOutAlt className="text-xl" />

            Logout

          </button>

        </div>

      </aside>
    </>
  );
};

export default Sidebar;