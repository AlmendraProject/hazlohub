import { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export function TypographyH1({ children, className = "" }: TypographyProps) {
  return (
    <h1
      className={`text-4xl font-bold leading-tight tracking-tight ${className}`}>
      {children}
    </h1>
  );
}

export function TypographyH2({ children, className = "" }: TypographyProps) {
  return (
    <h2 className={`text-2xl font-semibold leading-snug ${className}`}>
      {children}
    </h2>
  );
}

export function TypographyP({ children, className = "" }: TypographyProps) {
  return (
    <p className={`text-base leading-relaxed text-gray-700 ${className}`}>
      {children}
    </p>
  );
}
