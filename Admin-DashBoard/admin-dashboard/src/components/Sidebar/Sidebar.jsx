import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white/10 backdrop-blur-md border-r border-white/20 p-4 text-white">
      <ul className="flex flex-col gap-3">
        <li>
          <NavLink
            to="/dashboard"
            end
            className="block rounded-md px-4 py-2 hover:bg-white/20 transition"
          >
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/categories"
            className="block rounded-md px-4 py-2 hover:bg-white/20 transition"
          >
            Categories
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/products"
            className="block rounded-md px-4 py-2 hover:bg-white/20 transition"
          >
            Products
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/users"
            className="block rounded-md px-4 py-2 hover:bg-white/20 transition"
          >
            Users
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/profile"
            className="block rounded-md px-4 py-2 hover:bg-white/20 transition"
          >
            Profile
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
