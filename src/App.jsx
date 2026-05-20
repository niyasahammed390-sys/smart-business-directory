import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Attendance from "./pages/Attendance";
import Salary from "./pages/Salary";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
  path="/"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
        <Route
  path="/employees"
  element={
    <ProtectedRoute>
      <AdminRoute>
        <Employees />
      </AdminRoute>
    </ProtectedRoute>
  }
/>
<Route
  path="/attendance"
  element={
    <ProtectedRoute>
      <Attendance />
    </ProtectedRoute>
  }
/>
<Route
  path="/salary"
  element={
    <ProtectedRoute>
      <Salary />
    </ProtectedRoute>
  }
/>
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}