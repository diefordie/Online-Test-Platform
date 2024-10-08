// components/Sidebar.js
import React, { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <nav className="h-screen w-64 fixed top-0 left-0 p-7">
    <nav className="flex">
    <nav className="w-55 text-white min-h-screen p-8">
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
    </nav>
    </nav>
  );
};
// const Layout = ({ children }) => {
//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main content */}
//       <div className="ml-64 p-7 w-full">
//         {children}
//       </div>
//     </div>
//   );
// };
export default Sidebar;

// // import React from "react";
// import Link from "next/link";

// const Sidebar = () => {
//   return (
//     <nav className="h-screen w-64 bg-gray-100 fixed top-0 left-0 p-5 shadow-md">
//       <ul className="space-y-4">
//         <li>
//           <Link href="/admin/dashboard" className="text-gray-800 font-semibold hover:text-blue-500">
//             Dashboard
//           </Link>
//         </li>
//         <li>
//           <Link href="/admin/users" className="text-gray-800 font-semibold hover:text-blue-500">
//             Users
//           </Link>
//         </li>
//         <li>
//           <Link href="/admin/settings" className="text-gray-800 font-semibold hover:text-blue-500">
//             Settings
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Sidebar;
