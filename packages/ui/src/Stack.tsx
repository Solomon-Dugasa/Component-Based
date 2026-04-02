import type { CSSProperties, ReactNode } from "react";
import { space } from "./tokens.js";

type Gap = keyof typeof space;

export type StackProps = {
  children: ReactNode;
  gap?: Gap;
  style?: CSSProperties;
};

/** Vertical rhythm primitive — composes spacing without coupling to page layout. */
export function Stack({ children, gap = "md", style }: StackProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: space[gap],
        ...style,
      }}
    >
      {children}
    </div>
  );
}
