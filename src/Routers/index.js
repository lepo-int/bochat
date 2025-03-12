import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Features/Auth/login";
import Signup from "../Features/Auth/signup";
import Dashboard from "../Features/Dashboard/dashboard";
import PrivateRoute from "./routers";
import AuthProvider from "../Hooks/authProvider";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
