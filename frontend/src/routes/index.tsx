/* eslint-disable react-refresh/only-export-components */
import { PageLoader } from "@/components/loader/page-loader";
import AuthLayout from "@/layout/auth-layout";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorScreen from "./error/error-screen";
import LoginScreen from "./auth/login-screen";
import PrivateWrapper from "@/routers/middleware/PrivateWrapper";
import Profile from "./profile/Profile";
import Preview from "./Preview";

const UserDashboard = lazy(() => import("./user-dashboard/dashboard"));

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<PageLoader />}>
            <LoginScreen />
          </Suspense>
        ),
      },
      {
        path: "sign-up",
        element: (
          <Suspense fallback={<PageLoader />}>
            <LoginScreen />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <PrivateWrapper />,
    errorElement: <ErrorScreen />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <UserDashboard />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Profile />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/preview",
    errorElement: <ErrorScreen />,
    children: [
      {
        path: ":id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Preview />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
