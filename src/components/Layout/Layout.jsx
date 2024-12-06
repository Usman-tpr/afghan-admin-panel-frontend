import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";  // To render child routes (Dashboard, ManageVisits, etc.)

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
              <Link to="/admin/dashboard" className="hover:text-yellow-500">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/manage-visits" className="hover:text-yellow-500">
                Manage Visits
              </Link>
            </li>
            <li>
              <Link to="/admin/manage-events" className="hover:text-yellow-500">
                Manage Events
              </Link>
            </li>
            {/* Add more navigation links here */}
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full p-6 bg-gray-100 ml-64">
        {/* Render the nested route content here */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
