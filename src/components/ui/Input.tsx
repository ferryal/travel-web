import * as React from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-slate-700">{label}</label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {icon}
            </div>
          )}
          <BaseInput
            ref={ref}
            className={cn(
              "h-11 w-full rounded-xl border-none bg-white text-sm font-medium text-slate-600 shadow-soft outline-none ring-1 ring-slate-100 transition-shadow placeholder:text-slate-400 focus:ring-2 focus:ring-primary-500/20",
              icon && "pl-10",
              error && "ring-danger-500/50",
              className,
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-danger-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
