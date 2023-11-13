import React, { useState, useEffect } from "react";
import { CheckAdminLogin } from "./api/auth";
import { useNavigate } from "react-router-dom";

function AdminProtectedRoute({ Component }) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      const result = await CheckAdminLogin();
      if (!result.verify) {
        navigate("/adminLogin");
      } else {
        navigate("/dashboard");
      }
    };
    checkAuthentication();
  }, []);

  return <Component />;
}
export default AdminProtectedRoute;
