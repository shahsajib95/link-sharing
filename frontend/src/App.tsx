import { RouterProvider } from "react-router-dom";
import router from "./routes";

import "./App.css";

import { useAppDispatch } from "./store/store";
import { Toaster } from "react-hot-toast";
import { Suspense, useEffect, useState } from "react";
import { authAction } from "./features/auth/authSlice";
import { PageLoader } from "./components/loader/page-loader";

function App() {
  // Retrieve user from localStorage once
  const storedUser = localStorage.getItem("user");
  const isUser = storedUser ? JSON.parse(storedUser) : null; // Handle null or undefined case

  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isUser?.user) {
      dispatch(authAction.loginSuccess(isUser));
    }
    setLoading(false);
  }, []);

  if (loading) return <PageLoader />;

  return (
    <Suspense fallback={<>loading</>}>
      <RouterProvider router={router} />
      <Toaster />
    </Suspense>
  );
}

export default App;
