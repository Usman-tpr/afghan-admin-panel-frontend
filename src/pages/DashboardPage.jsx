import React, { useEffect, useState } from "react";
import { getData } from "../api/api"; // Reusable API service for GET requests
import { Link } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2"; // Importing Chart components
import "chart.js/auto"; // Required for charts

const DashboardPage = () => {
  const [visitCount, setVisitCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [recentVisitors, setRecentVisitors] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // const visitResponse = await getData("/visits"); // Fetch visits data
        // const eventResponse = await getData("/events"); // Fetch events data
        // const recentVisitorsResponse = await getData("/visitors/recent"); // Recent visitors
        // const recentEventsResponse = await getData("/events/recent"); // Recent events

        // setVisitCount(visitResponse.length);
        // setEventCount(eventResponse.length);
        // setRecentVisitors(recentVisitorsResponse);
        // setRecentEvents(recentEventsResponse);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchStats();
  }, []);

  // Example data for charts
  const visitChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Visits",
        data: [12, 19, 3, 5, 2, 3, 7], // Example data
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const eventChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Events",
        data: [10, 15, 8, 12, 18, 25], // Example data
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-6 ">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/visitors" className="dashboard-card">
          <div className="p-4 bg-blue-500 text-white rounded-md shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-semibold">Total Visits</h2>
            <p className="text-3xl font-bold">{visitCount}</p>
          </div>
        </Link>
        <Link to="/events" className="dashboard-card">
          <div className="p-4 bg-green-500 text-white rounded-md shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-semibold">Total Events</h2>
            <p className="text-3xl font-bold">{eventCount}</p>
          </div>
        </Link>
        <div className="dashboard-card">
          <div className="p-4 bg-gray-800 text-white rounded-md shadow-md">
            <h2 className="text-lg font-semibold">New Sign-ups</h2>
            <p className="text-3xl font-bold">4</p> {/* Placeholder */}
          </div>
        </div>
        <div className="dashboard-card">
          <div className="p-4 bg-yellow-500 text-white rounded-md shadow-md">
            <h2 className="text-lg font-semibold">Total Admin Memembers</h2>
            <p className="text-3xl font-bold">0</p> {/* Placeholder */}
          </div>
        </div>
        <div className="dashboard-card">
          <div className="p-4 bg-red-950 text-white rounded-md shadow-md">
            <h2 className="text-lg font-semibold">Total Admin Memembers</h2>
            <p className="text-3xl font-bold">0</p> {/* Placeholder */}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="p-6 bg-white rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-4">Weekly Visits</h3>
          <Bar data={visitChartData} />
        </div>
        <div className="p-6 bg-white rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-4">Monthly Events</h3>
          <Line data={eventChartData} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-md shadow-md">
            <h4 className="text-lg font-bold mb-2">Recent Visitors</h4>
            <ul>
              {recentVisitors.length > 0
                ? recentVisitors.map((visitor, index) => (
                    <li key={index} className="py-2 border-b">
                      {visitor.name} - {visitor.date}
                    </li>
                  ))
                : "No recent visitors."}
            </ul>
          </div>
          <div className="p-6 bg-white rounded-md shadow-md">
            <h4 className="text-lg font-bold mb-2">Recent Events</h4>
            <ul>
              {recentEvents.length > 0
                ? recentEvents.map((event, index) => (
                    <li key={index} className="py-2 border-b">
                      {event.title} - {event.date}
                    </li>
                  ))
                : "No recent events."}
            </ul>
          </div>
        </div>
      </div>

      {/* Announcements/Notifications */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Announcements</h3>
        <div className="p-4 bg-gray-100 rounded-md shadow-md">
          <p>No new announcements at the moment.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
