import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { ComponentPropsWithoutRef, ElementType } from "react";

const sizeClasses = {
  displayLarge: "clamp-[text,3rem,3.5rem] leading-[1.14] ",
  displayLargeAlt: "clamp-[text,1.75rem,3.5rem] leading-[1] ",
  displaySmall: "clamp-[text,2rem,3rem] leading-[1.08]",
  titleLg: "clamp-[text,1.75rem,2rem] leading-[1] md:leading-[1.1]",
  titleLgAlt: "clamp-[text,1.25rem,2rem] leading-[1] ",
  titleMd: "text-[1.75rem] leading-[1.16]",
  titleSmall: "text-[1.5rem] leading-[1.16]",
  titleSmallMd: "text-[1.5rem] leading-[1.16] font-medium",
  caption: "text-[0.75rem] leading-[1]",
  bodyLarge: "clamp-[text,1.125rem,1.25rem] leading-[1.11] md:leading-[1.2]",
  p: "text-[1rem] leading-[1.25] ",
  text: "text-[0.875rem] leading-[1]",
};

export type Size = keyof typeof sizeClasses;

export interface TextProps extends ComponentPropsWithoutRef<"p"> {
  asChild?: boolean;
  as?: ElementType;
  size?: Size;
  className?: string;
}

export default function Text({
  asChild,
  as: Tag = "p",
  size = "p",
  className,
  children,
  ...props
}: TextProps) {
  const sizeClass = sizeClasses[size];
  const Component = asChild ? Slot : Tag;

  return (
    <Component className={cn(sizeClass, className)} {...props}>
      {children}
    </Component>
  );
}
