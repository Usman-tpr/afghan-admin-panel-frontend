import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./components/Layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import VisitorPage from "./pages/VsitorPage";
import EventPage from "./pages/EventPage";
import CreateMembers from "./pages/CreateMembers";

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("AdminInfo");
  return token ? children : <Navigate to="/login" />;
};

// CheckingAdmin Component
const CheckingAdmin = () => {
  const token = localStorage.getItem("AdminInfo");
  return token ? <Navigate to="/admin/dashboard" /> : <Login />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<CheckingAdmin />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="manage-visits" element={<VisitorPage />} />
          <Route path="manage-events" element={<EventPage />} />
          <Route path="manage-members" element={<CreateMembers />} />
        </Route>

        {/* Redirect to Login for unmatched routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
