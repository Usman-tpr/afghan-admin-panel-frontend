import React from "react";
import { BrowserRouter as Router, Route, Routes , Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./components/Layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import VisitorPage from "./pages/VsitorPage";
import EventPage from "./pages/EventPage";

// Create a Protected Route to check for JWT token
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  console.log(token)
  return token ? element : <Navigate to="/login" />;  // Use Navigate instead of Redirect
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
          <Route path="manage-visits" element={<ProtectedRoute element={<VisitorPage />} />} />
          <Route path="manage-events" element={<ProtectedRoute element={<EventPage />} />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
