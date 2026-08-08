import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface BaseProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "onDark" | "whatsapp";
  href?: string;
  className?: string;
}

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

const variantClasses: Record<NonNullable<BaseProps["variant"]>, string> = {
  primary: "bg-roseTaupe text-warmWhite hover:bg-dustyRose",
  secondary:
    "bg-transparent text-graphite border border-graphite/20 hover:border-graphite/40",
  onDark: "bg-warmWhite text-graphite hover:bg-champagne",
  whatsapp:
    "bg-[#25D366] text-white shadow-[0_12px_28px_-10px_rgba(37,211,102,0.65)] hover:bg-[#1fbd5a]",
};

export default function Button({
  children,
  variant = "primary",
  href,
  className,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs font-medium tracking-wide transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-soft sm:px-8 sm:py-3 sm:text-sm ${variantClasses[variant]} ${className ?? ""}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
