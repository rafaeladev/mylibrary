import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center  text-s sm:text-sm font-light  offset-background transition-colors  disabled:pointer-events-none disabled:opacity-50  ",
  {
    variants: {
      variant: {
        default:
          "bg-mc-beige text-mc-white hover:bg-mc-violet after:content-[''] after:bg-mc-violet/20 after:w-full  after:absolute after:-bottom-1.5 after:-right-2 after:h-10 after:-z-50 ",
        destructive:
          "bg-mc-rose text-mc-white hover:bg-mc-violet after:content-[''] after:bg-mc-violet/20 after:w-full  after:absolute after:-bottom-1.5 after:-right-2 after:h-10 after:-z-50",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-mc-green text-mc-white hover:bg-mc-violet after:content-[''] after:bg-mc-violet/20 after:w-full  after:absolute after:-bottom-1.5 after:-right-2 after:h-10 after:-z-50",
        ghost: "text-mc-white hover:text-mc-violet",
        link: "text-mc-white underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-10",
        sm: "px-1 sm:h-9  sm:px-2",
        lg: "h-11  px-10",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
