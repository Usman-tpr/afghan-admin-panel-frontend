import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaCalendarAlt, FaSignOutAlt, FaUser } from "react-icons/fa"; // Importing icons

const AdminLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed w-64 h-screen bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>
        <nav>
          <ul className="space-y-4 p-4">
            <li>
              <Link to="/admin/dashboard" className="flex items-center hover:text-yellow-500">
                <FaTachometerAlt className="mr-2" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/manage-visits" className="flex items-center hover:text-yellow-500">
                <FaUsers className="mr-2" /> Manage Visits
              </Link>
            </li>
            <li>
              <Link to="/admin/manage-events" className="flex items-center hover:text-yellow-500">
                <FaCalendarAlt className="mr-2" /> Manage Events
              </Link>
            </li>
            <li>
              <Link to="/admin" className="flex items-center hover:text-yellow-500">
                <FaCalendarAlt className="mr-2" /> Manage Gallary
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full bg-gray-100 ml-64">
        {/* Navbar */}
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Afghan Invest</h1>
          <div className="flex space-x-4 items-center">
            <Link to="/admin/profile" className="flex items-center text-gray-600 hover:text-yellow-500">
              <FaUser className="mr-2" /> Profile
            </Link>
            <Link to="/logout" className="flex items-center text-gray-600 hover:text-yellow-500">
              <FaSignOutAlt className="mr-2" /> Logout
            </Link>
          </div>
        </div>

        {/* Render the nested route content here */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
