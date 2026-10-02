import * as React from "react";
import { cn } from "./card";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const getStyles = () => {
    switch (variant) {
      case "success":
        return { background: "#ecfdf5", color: "#065f46", border: "1px solid #10b981" };
      case "warning":
        return { background: "#fef3c7", color: "#92400e", border: "1px solid #f59e0b" };
      case "destructive":
        return { background: "#fee2e2", color: "#991b1b", border: "1px solid #ef4444" };
      case "outline":
        return { background: "transparent", color: "var(--neutral-700)", border: "1px solid var(--neutral-300)" };
      case "secondary":
        return { background: "var(--neutral-100)", color: "var(--gov-navy-950)", border: "1px solid var(--neutral-300)" };
      default:
        return { background: "var(--gov-navy-900)", color: "#ffffff", border: "1px solid var(--gov-navy-950)" };
    }
  };

  return (
    <div
      className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors", className)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: "9999px",
        padding: "2px 10px",
        fontSize: "0.75rem",
        fontWeight: 700,
        ...getStyles()
      }}
      {...props}
    />
  );
}
