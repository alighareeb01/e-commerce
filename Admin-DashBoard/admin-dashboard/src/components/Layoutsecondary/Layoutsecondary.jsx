import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

export default function Layoutsecondary() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex ">
        <Sidebar />

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
