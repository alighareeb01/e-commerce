import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faHouse,
  faList,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function toggleDropMenu() {
    setOpen((prev) => !prev);
  }
  return (
    <>
      <div className="sticky top-0 z-50 w-full bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="flex items-center justify-between gap-3 px-4 py-4 text-white">
          <div>
            <a href="/">
              <img
                src="/download.png"
                alt="logo"
                className="w-8 h-8 object-cover rounded-full sm:h-10 sm:w-10"
              />
            </a>
          </div>
          <ul className="flex items-center gap-3 sm:gap-5 md:gap-8 lg:gap-12">
            <li>
              <NavLink to="/" className="nav-link">
                <FontAwesomeIcon icon={faHouse} />{" "}
                <span className="hidden md:inline">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="nav-link">
                <FontAwesomeIcon icon={faUser} />
                <span className="hidden md:inline">About</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/adduser" className="nav-link">
                <FontAwesomeIcon icon={faList} />
                <span className="hidden md:inline">add user</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className="nav-link">
                <FontAwesomeIcon icon={faBox} />
                <span className="hidden md:inline">Dashboard</span>
              </NavLink>
            </li>
          </ul>
          <div className="flex flex-col items-center justify-center">
            <img
              src="/avatar.jpg"
              alt="avatar"
              className="w-8 h-8 object-cover cursor-pointer sm:h-10 sm:w-10"
              onClick={toggleDropMenu}
            />
            {open && (
              <div className=" right-0 mt-2 w-40 sm:w-32 md:w-40">
                <ul>
                  <NavLink
                    to="/profile"
                    className="nav-link flex justify-center"
                  >
                    profile
                  </NavLink>
                  <li className="nav-link flex justify-center">Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
