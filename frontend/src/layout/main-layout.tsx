import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

import { CircleUser, Code2, Eye, Link2 } from "lucide-react";

// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useAppSelector } from "@/store/store";
import MobileCard from "@/components/MobileCard";

export default function MainLayout() {
  const location = useLocation();

  const isLoggedIn = localStorage.getItem("user");

  const { user } = useAppSelector((state) => state.auth);


  const getActive = (path: string) => {
    if (location?.pathname == path) return "bg-violet-100 text-primary ";
  };

  if (isLoggedIn)
    return (
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 flex items-center bg-background px-4 py-6 md:px-6">
          <nav className="flex w-full items-center justify-between gap-6">
            {/* Logo at the start */}
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Code2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-gray-600 hidden 2xl:block xl:bolck md:block lg:block">devlinks</span>
            </Link>

            {/* Centered links */}
            <div className="flex flex-grow items-center justify-center gap-6 text-sm">
              <Link
                to="/"
                className={`flex items-center gap-2 rounded-md  p-2 px-4 font-semibold text-muted-foreground transition-colors hover:bg-violet-50	 hover:text-primary ${getActive("/")}`}
              >
                <Link2 className="h-6 w-6" /> <span className="hidden 2xl:block xl:bolck md:block lg:block">Links</span>
              </Link>
              <Link
                to="/profile"
                className={`flex items-center gap-2 rounded-md  p-2 px-4  font-semibold text-muted-foreground transition-colors	hover:bg-violet-50 hover:text-primary ${getActive("/profile")}`}
              >
                <CircleUser className="h-6 w-6" />  <span className="hidden 2xl:block xl:bolck md:block lg:block">Profile details</span>
              </Link>
            </div>

            {/* Button at the end */}
            <div className="flex items-center">
              <Link to={`/preview/${user?.user?._id}`}>
                {" "}
                <Button
                  variant="outline"
                  className="border-primary text-primary"
                >
                  <Eye className="h-6 w-6 block 2xl:hidden xl:hidden md:hidden lg:hidden" />
                 <span className="hidden 2xl:block xl:bolck md:block lg:block"> Preview</span>
                </Button>
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4  bg-muted/40 p-4 md:gap-8 md:p-8">
          <div className="grid gap-6 sm:grid-cols-4 xs:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6">
            <MobileCard />

            <Outlet />
          </div>
        </main>
      </div>
    );

  return <Navigate to="/auth/login" state={{ from: location }} replace />;
}
