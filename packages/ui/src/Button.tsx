import type { ButtonHTMLAttributes, ReactNode } from "react";
import { colors, font, radii, space } from "./tokens.js";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "ghost";
};

export function Button({
  children,
  variant = "primary",
  style,
  ...rest
}: ButtonProps) {
  const base = {
    fontFamily: font.body,
    fontWeight: font.title,
    padding: `${space.sm}px ${space.md}px`,
    borderRadius: radii.md,
    border: "1px solid transparent",
    cursor: rest.disabled ? "not-allowed" : "pointer",
    opacity: rest.disabled ? 0.6 : 1,
  } as const;

  const variants =
    variant === "primary"
      ? {
          backgroundColor: colors.accent,
          color: "#fff",
          borderColor: colors.accent,
        }
      : {
          backgroundColor: "transparent",
          color: colors.accent,
          borderColor: colors.border,
        };

  return (
    <button type="button" {...rest} style={{ ...base, ...variants, ...style }}>
      {children}
    </button>
  );
}
