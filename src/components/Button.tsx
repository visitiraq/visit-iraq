import { cn } from "@/lib/utils";
import { tv, type VariantProps } from "tailwind-variants";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

const buttonVariants = tv({
  base: "inline-flex items-center justify-center gap-2 py-[.6rem] px-[1.5rem] min-h-[52px] w-fit whitespace-nowrap rounded-[0.5rem] leading-[1.1] text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  variants: {
    variant: {
      Primary: "bg-mint-green  text-white hover:bg-dark-mint-green",
      Outlined: "border border-color-surface-blue text-surface-blue",
    },
    isFullWidth: {
      true: "w-full",
    },
  },

  defaultVariants: {
    variant: "Primary",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      asChild = false,
      children,
      isFullWidth,
      isLoading,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            isFullWidth,
            className,
          })
        )}
        ref={ref}
        disabled={props.disabled || isLoading}
        type="button"
        {...props}
      >
        {isLoading ? "..." : children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
