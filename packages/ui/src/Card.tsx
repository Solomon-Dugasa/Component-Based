import type { CSSProperties, ReactNode } from "react";
import { colors, radii, space } from "./tokens.js";

export type CardProps = {
  children: ReactNode;
  title?: string;
  style?: CSSProperties;
};

export function Card({ children, title, style }: CardProps) {
  return (
    <section
      style={{
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: radii.lg,
        padding: space.lg,
        boxShadow: "0 1px 2px rgb(15 23 42 / 6%)",
        ...style,
      }}
    >
      {title ? (
        <header style={{ marginBottom: space.md }}>
          <h2
            style={{
              margin: 0,
              fontSize: "1.125rem",
              fontWeight: 600,
              color: colors.text,
            }}
          >
            {title}
          </h2>
        </header>
      ) : null}
      {children}
    </section>
  );
}
