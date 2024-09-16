// components/Sidebar.js
import Link from 'next/link';

const Sidebar = () => {
  return (
    <nav className="h-screen w-64 bg-gray-100 fixed top-0 left-0 p-5 shadow-md">
      <ul className="space-y-4">
        <li>
          <Link href="/admin/dashboard">
            <a className="text-gray-800 font-semibold hover:text-blue-500">Dashboard</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/users">
            <a className="text-gray-800 font-semibold hover:text-blue-500">Users</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/settings">
            <a className="text-gray-800 font-semibold hover:text-blue-500">Settings</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
