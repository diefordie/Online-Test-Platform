// components/Sidebar.js
import React, { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <nav className="h-screen w-64 fixed top-0 left-0 p-7">
      <ul className="space-y-7">
        <li className="mt-24">
          <Link
            href="/admin/dashboard"
            className="text-gray-800 font-semibold hover:text-blue-500"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/admin/users"
            className="text-gray-800 font-semibold hover:text-blue-500"
          >
            Users
          </Link>
        </li>
        <li>
          <Link
            href="/admin/settings"
            className="text-gray-800 font-semibold hover:text-blue-500"
          >
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
