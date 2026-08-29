import * as React from "react";
import { cn } from "./card";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "saffron";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const getVariantStyles = () => {
      switch (variant) {
        case "saffron":
          return { background: "var(--saffron-500, #f59e0b)", color: "#071626", border: "1px solid #d97706" };
        case "destructive":
          return { background: "#dc2626", color: "#ffffff", border: "1px solid #b91c1c" };
        case "outline":
          return { background: "#ffffff", color: "var(--gov-navy-950)", border: "1.5px solid var(--neutral-300)" };
        case "secondary":
          return { background: "var(--neutral-100)", color: "var(--gov-navy-950)", border: "1px solid var(--neutral-300)" };
        case "ghost":
          return { background: "transparent", color: "var(--gov-navy-950)", border: "none" };
        case "link":
          return { background: "transparent", color: "var(--gov-navy-900)", border: "none", textDecoration: "underline" };
        default:
          return { background: "var(--gov-navy-900, #0f2942)", color: "#ffffff", border: "1px solid var(--gov-navy-950)" };
      }
    };

    const getSizeStyles = () => {
      switch (size) {
        case "sm":
          return { padding: "6px 12px", fontSize: "0.8rem", borderRadius: "var(--radius-xs, 4px)" };
        case "lg":
          return { padding: "12px 24px", fontSize: "1rem", borderRadius: "var(--radius-md, 8px)" };
        case "icon":
          return { padding: "8px", width: "36px", height: "36px", borderRadius: "var(--radius-sm, 6px)" };
        default:
          return { padding: "9px 18px", fontSize: "0.88rem", borderRadius: "var(--radius-sm, 6px)" };
      }
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          fontWeight: 700,
          cursor: "pointer",
          ...getVariantStyles(),
          ...getSizeStyles()
        }}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
