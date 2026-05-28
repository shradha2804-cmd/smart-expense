import React, {
  useState,
} from "react";

import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/dashboard/AdminSidebar";

import AdminNavbar from "../components/dashboard/AdminNavbar";

const AdminLayout = () => {

  const [sidebarOpen,
    setSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-[#F3F0FF] overflow-hidden">

      {/* SIDEBAR */}
      <AdminSidebar
        sidebarOpen={
          sidebarOpen
        }
        setSidebarOpen={
          setSidebarOpen
        }
      />

      {/* MAIN */}
      <div className="lg:ml-[280px] min-h-screen flex flex-col min-w-0">

        {/* NAVBAR */}
        <AdminNavbar
          setSidebarOpen={
            setSidebarOpen
          }
        />

        {/* PAGE */}
        <main className="flex-1 p-5 md:p-8 overflow-y-auto overflow-x-hidden">

          <Outlet />

        </main>

      </div>

    </div>
  );
};

export default AdminLayout;