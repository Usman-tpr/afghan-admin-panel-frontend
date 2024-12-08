import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaCalendarAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";
import { getData } from "../../api/api";

const AdminLayout = () => {
  const [name, setName] = useState("");
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("AdminInfo"));
 
   const url = useLocation()
   const location = url.pathname
   
  const handleLogOut = () => {
    localStorage.removeItem("AdminInfo");
    setLoggedIn(false); // Update loggedIn state to trigger UI refresh
    <Navigate to='/login' />
  };

  const handleFetch = async () => {
    const token = localStorage.getItem("AdminInfo");
    if (token) {
      try {
        const response = await getData("/user/get");
        setLoggedIn(true)
        setName(response.data.name);
      } catch (error) {
        console.log(error);
      }
    } else {
      setName(""); // Clear name when token is missing
    }
  };

  useEffect(() => {
    handleFetch();
  }, [loggedIn , name]); // Re-run fetch when loggedIn state changes

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed w-64 h-screen bg-gray-800 text-white">
        <div >
          <h2 className="text-2xl hover:bg-black hover:text-white font-bold p-7">Admin Panel</h2>
        </div>
        <nav>
          <ul className="space-y-5">
            <li>
              <Link to="/admin/dashboard" className={`flex items-center text-xl hover:bg-white hover:text-black p-2 ${location === '/admin/dashboard' ? "bg-white text-black":""}`}>
                <FaTachometerAlt className="mr-2" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/manage-visits" className={`flex items-center text-xl hover:bg-white hover:text-black p-2 ${location === '/admin/manage-visits' ? "bg-white text-black":""}`}> 
                <FaUsers className="mr-2" /> Manage Articles
              </Link>
            </li>
            <li>
              <Link to="/admin/manage-events" className={`flex items-center text-xl hover:bg-white hover:text-black p-2 ${location === '/admin/manage-events' ? "bg-white text-black":""}`}> 
                <FaCalendarAlt className="mr-2" /> Manage Events
              </Link>
            </li>
            <li>
              <Link to="/admin/manage-members" className={`flex items-center text-xl hover:bg-white hover:text-black p-2 ${location === '/admin/members' ? "bg-white text-black":""}`}> 
                <MdCreateNewFolder  className="mr-2" /> Create Memebers
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
              <FaUser className="mr-2" /> {name || "Profile"}
            </Link>
            <button onClick={handleLogOut} className="flex items-center text-gray-600 hover:text-yellow-500">
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
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
