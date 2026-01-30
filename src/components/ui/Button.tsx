import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const variantStyles = {
  primary:
    "bg-slate-900 text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-0.5",
  secondary:
    "bg-primary-600 text-white shadow-lg shadow-primary-200 hover:bg-primary-700 hover:-translate-y-0.5",
  outline:
    "border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50",
  ghost: "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
  danger:
    "bg-danger-600 text-white shadow-lg shadow-danger-200 hover:bg-danger-700 hover:-translate-y-0.5",
};

const sizeStyles = {
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </BaseButton>
  );
}
