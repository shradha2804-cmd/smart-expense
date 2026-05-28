import React from "react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  FaChartPie,
  FaUsers,
  FaBell,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaTimes,
  FaShieldAlt,
  FaEnvelope,
} from "react-icons/fa";

const AdminSidebar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {

  const navigate =
    useNavigate();

  const logoutHandler =
    () => {

      // REMOVE ONLY AUTH DATA
      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "isAdmin"
      );

      navigate("/login");

    };

  const links = [

    {
      name: "Dashboard",
      path:
        "/admin/dashboard",
      icon: <FaChartPie />,
    },

    {
      name: "Users",
      path:
        "/admin/users",
      icon: <FaUsers />,
    },

    {
      name: "Notifications",
      path:
        "/admin/notifications",
      icon: <FaBell />,
    },

    {
      name: "Messages",
      path:
        "/admin/messages",
      icon: <FaEnvelope />,
    },

    {
      name: "Analytics",
      path:
        "/admin/analytics",
      icon: <FaChartBar />,
    },

    {
      name: "Settings",
      path:
        "/admin/settings",
      icon: <FaCog />,
    },

  ];

  return (
    <>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (

        <div
          onClick={() =>
            setSidebarOpen(
              false
            )
          }
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        ></div>

      )}

      {/* SIDEBAR */}
      <aside className={`fixed top-0 left-0 h-screen w-[280px] bg-[#2E1065] text-white z-50 transition-all duration-300 shadow-2xl
      ${
        sidebarOpen
          ? "translate-x-0"
          : "-translate-x-full lg:translate-x-0"
      }`}>

        {/* TOP */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">

          <div className="flex items-center gap-4">

            <div className="h-14 w-14 rounded-2xl bg-purple-500 flex items-center justify-center text-3xl">

              <FaShieldAlt />

            </div>

            <div>

              <h1 className="text-3xl font-bold">

                Finora

              </h1>

              <p className="text-purple-200 text-sm">

                Admin Panel

              </p>

            </div>

          </div>

          <button
            onClick={() =>
              setSidebarOpen(
                false
              )
            }
            className="lg:hidden text-2xl"
          >

            <FaTimes />

          </button>

        </div>

        {/* LINKS */}
        <div className="p-5 flex flex-col h-[calc(100vh-100px)]">

          <div className="space-y-3 flex-1">

            {links.map(
              (
                item,
                index
              ) => (

                <NavLink
                  key={index}
                  to={item.path}
                  onClick={() =>
                    setSidebarOpen(
                      false
                    )
                  }
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-5 py-4 rounded-2xl transition text-lg
                    ${
                      isActive
                        ? "bg-purple-500 text-white shadow-lg"
                        : "hover:bg-white/10"
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

          {/* LOGOUT */}
          <button
            onClick={
              logoutHandler
            }
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-red-500 hover:bg-red-600 transition text-lg"
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </aside>

    </>
  );
};

export default AdminSidebar;