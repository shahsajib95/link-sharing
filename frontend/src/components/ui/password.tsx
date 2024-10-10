import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./button";

interface PasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Password = React.forwardRef<HTMLInputElement, PasswordProps>(
  ({ className, ...props }, ref) => {
    const [type, setType] = React.useState<"password" | "text">("password");

    const handleType = () => {
      if (type === "password") {
        setType("text");
      } else {
        setType("password");
      }
    };

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />

        <Button
          type="button"
          className="absolute right-px top-1/2 h-[95%] -translate-y-1/2 rounded-md px-3"
          variant="ghost"
          onClick={handleType}
        >
          {type === "password" ? (
            <Eye className=" h-5 w-5 " strokeWidth={1.5} />
          ) : (
            <EyeOff className=" h-5 w-5 " strokeWidth={1.5} />
          )}
        </Button>
      </div>
    );
  },
);
Password.displayName = "Password";

export { Password };
