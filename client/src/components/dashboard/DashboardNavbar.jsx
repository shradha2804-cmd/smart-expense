import React, {
  useEffect,
  useState,
} from "react";

import {
  FaBell,
  FaBars,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import API from "../../utils/api";

const DashboardNavbar = ({
  setSidebarOpen,
  unreadCount,
}) => {

  const navigate = useNavigate();

  const [userInfo,
    setUserInfo] =
    useState(null);

  // FETCH USER PROFILE
  const fetchUserProfile =
    async () => {

      try {

        const { data } =
          await API.get(
            "/users/profile"
          );

        setUserInfo(data);

      } catch (error) {

        console.log(
          error
        );

      }

    };

  useEffect(() => {

    fetchUserProfile();

  }, []);

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

          {unreadCount > 0 && (

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