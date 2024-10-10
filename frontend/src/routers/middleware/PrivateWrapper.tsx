
import { Navigate, useLocation } from "react-router-dom";

import { useAppSelector } from "@/store/store";
import MainLayout from "@/layout/main-layout";

const PrivateWrapper = () => {
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  const token = user?.token;

  // Check if the user is logged in and the token is valid
  const loggedIn = isLoggedIn && token;



  // If the user is not logged in, or the token has expired, redirect to login page
  if (!loggedIn) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If the user is logged in, render the main layout
  return <MainLayout />;
};

export default PrivateWrapper;
