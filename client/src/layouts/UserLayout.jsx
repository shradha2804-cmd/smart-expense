import React, {
  useEffect,
  useState,
} from "react";

import { Outlet } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";

import DashboardNavbar from "../components/dashboard/DashboardNavbar";

import API from "../utils/api";

const UserLayout = () => {

  const [sidebarOpen,
    setSidebarOpen] =
    useState(false);

  const [unreadCount,
    setUnreadCount] =
    useState(0);

  // FETCH UNREAD NOTIFICATIONS
  const fetchUnreadNotifications =
    async () => {

      try {

        const { data } =
          await API.get(
            "/notifications"
          );

        const unread =
          data.filter(
            (item) =>
              !item.isRead
          ).length;

        setUnreadCount(
          unread
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchUnreadNotifications();

    // LIVE UPDATE
    const updateNotifications =
      () => {

        fetchUnreadNotifications();

      };

    window.addEventListener(
      "notificationUpdate",
      updateNotifications
    );

    return () => {

      window.removeEventListener(
        "notificationUpdate",
        updateNotifications
      );

    };

  }, []);

  return (
    <section className="min-h-screen bg-[#F5F7FF] flex overflow-hidden">

      {/* SIDEBAR */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* NAVBAR */}
        <DashboardNavbar
          setSidebarOpen={setSidebarOpen}
          unreadCount={unreadCount}
        />

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto overflow-x-hidden">

          <Outlet />

        </main>

      </div>

    </section>
  );
};

export default UserLayout;