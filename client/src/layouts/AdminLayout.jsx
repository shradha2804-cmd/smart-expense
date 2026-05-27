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
    <div className="min-h-screen bg-[#F3F0FF]">

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
      <div className="lg:ml-[280px] min-h-screen flex flex-col">

        {/* NAVBAR */}
        <AdminNavbar
          setSidebarOpen={
            setSidebarOpen
          }
        />

        {/* PAGE */}
        <main className="flex-1 p-5 md:p-8">

          <Outlet />

        </main>

      </div>

    </div>
  );
};

export default AdminLayout;