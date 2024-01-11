import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "focus-visible:mc-marrom placeholder:text-mc-gray bg-mc-beigeClair flex h-10 w-full px-3  py-2 text-sm text-mc-marrom ring-offset-background file:border-0 file:bg-mc-beige file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
