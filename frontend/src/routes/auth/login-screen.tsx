import { useLocation } from "react-router-dom";

import { LoginForm } from "./components/login-form";
import { SignUpForm } from "./components/signup-form";

export default function LoginScreen() {
  const location = useLocation();
  const signUp = location?.pathname == "/auth/sign-up";
  return (
    <div className="flex h-screen items-center justify-center ">
      {signUp ? <SignUpForm /> : <LoginForm />}
    </div>
  );
}
