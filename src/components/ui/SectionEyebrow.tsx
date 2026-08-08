import { ReactNode } from "react";

interface SectionEyebrowProps {
  children: ReactNode;
  className?: string;
  lines?: boolean;
}

export default function SectionEyebrow({
  children,
  className = "",
  lines = true,
}: SectionEyebrowProps) {
  return (
    <div
      className={`flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-roseTaupe ${className}`}
    >
      {lines && <span className="h-px w-8 bg-roseTaupe/40" />}
      {children}
      {lines && <span className="h-px w-8 bg-roseTaupe/40" />}
    </div>
  );
}
