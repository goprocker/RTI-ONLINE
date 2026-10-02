import * as React from "react";
import { cn } from "./card";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive" | "warning" | "success" | "info";
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const getStyles = () => {
      switch (variant) {
        case "destructive":
          return { background: "#fee2e2", borderColor: "#ef4444", color: "#991b1b" };
        case "warning":
          return { background: "#fef3c7", borderColor: "#f59e0b", color: "#92400e" };
        case "success":
          return { background: "#ecfdf5", borderColor: "#10b981", color: "#065f46" };
        case "info":
          return { background: "#e0f2fe", borderColor: "#0284c7", color: "#0369a1" };
        default:
          return { background: "var(--neutral-50, #f8fafc)", borderColor: "var(--neutral-300, #cbd5e1)", color: "var(--gov-navy-950, #071626)" };
      }
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn("relative w-full rounded-lg border p-4", className)}
        style={{
          borderWidth: "1px",
          borderStyle: "solid",
          borderRadius: "var(--radius-sm, 6px)",
          padding: "14px 18px",
          fontSize: "0.88rem",
          lineHeight: "1.5",
          ...getStyles()
        }}
        {...props}
      />
    );
  }
);
Alert.displayName = "Alert";

export const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      style={{ margin: "0 0 4px", fontWeight: 700, fontSize: "0.92rem" }}
      {...props}
    />
  )
);
AlertTitle.displayName = "AlertTitle";

export const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      style={{ margin: 0, fontSize: "0.84rem" }}
      {...props}
    />
  )
);
AlertDescription.displayName = "AlertDescription";
