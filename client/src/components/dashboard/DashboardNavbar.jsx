import React, {
  useEffect,
  useState,
} from "react";

import {
  FaBell,
  FaBars,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const DashboardNavbar = ({
  setSidebarOpen,
}) => {

  const navigate = useNavigate();

  const [hasUnread,
    setHasUnread] =
    useState(false);

  const checkUnread =
    () => {

      const userInfo =
        JSON.parse(
          localStorage.getItem(
            "userInfo"
          )
        );

      const unread =
        userInfo?.notifications?.some(
          (item) =>
            item.read === false
        );

      setHasUnread(unread);

    };

  useEffect(() => {

    checkUnread();

    window.addEventListener(
      "notificationUpdate",
      checkUnread
    );

    return () => {

      window.removeEventListener(
        "notificationUpdate",
        checkUnread
      );

    };

  }, []);

  const userInfo =
    JSON.parse(
      localStorage.getItem(
        "userInfo"
      )
    );

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        <button
          onClick={() =>
            setSidebarOpen(true)
          }
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

        {/* NOTIFICATION */}
        <button
          onClick={() =>
            navigate("/notifications")
          }
          className="relative"
        >

          <FaBell className="text-2xl text-gray-600" />

          {hasUnread && (

            <span className="absolute -top-2 -right-2 h-3 w-3 rounded-full bg-red-500"></span>

          )}

        </button>

        {/* PROFILE */}
        <button
          onClick={() =>
            navigate("/settings")
          }
          className="overflow-hidden rounded-full"
        >

          {userInfo?.profileImage ? (

            <img
              src={
                userInfo.profileImage
              }
              alt=""
              className="h-12 w-12 rounded-full object-cover border-2 border-blue-100"
            />

          ) : (

            <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold uppercase text-lg">

              {userInfo?.name?.charAt(0)}

            </div>

          )}

        </button>

      </div>

    </header>
  );
};

export default DashboardNavbar;