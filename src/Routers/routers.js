import React from "react";
import { useAuth } from "../Hooks/authProvider";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const user = useAuth();
    if(!user.token) return <Navigate to="/login" />;
    return <Outlet/>;
};

export default PrivateRoute;