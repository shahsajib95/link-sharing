import { cn } from "@/lib/utils";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Link, NavLink } from "react-router-dom";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        logo: "h-[1.9rem] w-[1.9rem] rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  to?: string;
  replace?: boolean;
  linkType?: "NavLink";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      className,
      children,
      to,
      linkType,
      replace = false,
      size,
      ...props
    },
    ref
  ) => {
    if (linkType && to) {
      return (
        <NavLink
          to={to}
          replace={replace}
          className={cn(buttonVariants({ variant, className, size }))}
        >
          {children}
        </NavLink>
      );
    }
    if (to) {
      return (
        <Link
          to={to}
          replace={replace}
          className={cn(buttonVariants({ variant, className, size }))}
        >
          {children}
        </Link>
      );
    }
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, className, size }))}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
