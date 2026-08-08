import { ReactNode } from "react";

export default function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/60 bg-white/40 p-8 shadow-soft backdrop-blur-md transition-transform duration-300 ease-out hover:-translate-y-1 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
