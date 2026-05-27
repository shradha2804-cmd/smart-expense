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
    <div className="min-h-screen bg-[#F5F3FF] flex">

      {/* SIDEBAR */}
      <AdminSidebar
        sidebarOpen={
          sidebarOpen
        }
        setSidebarOpen={
          setSidebarOpen
        }
      />

      {/* CONTENT */}
      <div className="flex-1 flex flex-col lg:ml-[280px]">

        <AdminNavbar
          setSidebarOpen={
            setSidebarOpen
          }
        />

        <main className="p-4 md:p-8">

          <Outlet />

        </main>

      </div>

    </div>
  );
};

export default AdminLayout;