
import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
  const user = null

  if (!user) {
    return (
      <div>
        <main className="container-1350 mx-auto flex flex-1 items-center justify-center px-px">
          <Outlet />
        </main>
      </div>
    );
  }
  return <Navigate to="/" />;
}
