"use client";

import * as React from "react";
import { cn } from "./card";

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  className,
  children,
  ...props
}: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (val: string) => void;
  className?: string;
  children: React.ReactNode;
}) {
  const [tabValue, setTabValue] = React.useState(value || defaultValue || "");

  const currentVal = value !== undefined ? value : tabValue;
  const setVal = (newVal: string) => {
    if (value === undefined) setTabValue(newVal);
    onValueChange?.(newVal);
  };

  return (
    <TabsContext.Provider value={{ value: currentVal, onValueChange: setVal }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("inline-flex h-10 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500", className)}
      style={{
        display: "inline-flex",
        background: "var(--neutral-100, #f1f5f9)",
        padding: "4px",
        borderRadius: "var(--radius-sm, 6px)",
        gap: "4px"
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  className,
  children,
  ...props
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ctx = React.useContext(TabsContext);
  const isActive = ctx?.value === value;

  return (
    <button
      type="button"
      onClick={() => ctx?.onValueChange(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all",
        isActive ? "bg-white text-slate-950 shadow-sm" : "text-slate-600 hover:text-slate-900",
        className
      )}
      style={{
        padding: "6px 14px",
        fontSize: "0.84rem",
        fontWeight: isActive ? 700 : 600,
        borderRadius: "var(--radius-xs, 4px)",
        border: 0,
        cursor: "pointer",
        background: isActive ? "#ffffff" : "transparent",
        color: isActive ? "var(--gov-navy-950)" : "var(--neutral-600)",
        boxShadow: isActive ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)" : "none"
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  className,
  children,
  ...props
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const ctx = React.useContext(TabsContext);
  if (ctx?.value !== value) return null;

  return (
    <div className={cn("mt-2 ring-offset-white", className)} style={{ marginTop: "16px" }} {...props}>
      {children}
    </div>
  );
}
