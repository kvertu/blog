import type { ReactNode } from "react";

interface AlertProps {
  variant?: "error" | "success" | "info";
  children: ReactNode;
}

const styles = {
  error: "border-red-200 bg-red-50 text-red-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  info: "border-brand-200 bg-brand-50 text-brand-700",
};

export function Alert({ variant = "info", children }: AlertProps) {
  return (
    <div className={`rounded-xl border px-4 py-3 text-sm ${styles[variant]}`}>
      {children}
    </div>
  );
}
