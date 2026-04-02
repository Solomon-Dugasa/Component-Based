/** Design tokens — framework-agnostic; web and mobile import the same source of truth. */

export const colors = {
  canvas: "#f8fafc",
  surface: "#ffffff",
  text: "#0f172a",
  muted: "#64748b",
  accent: "#2563eb",
  accentHover: "#1d4ed8",
  border: "#e2e8f0",
} as const;

export const space = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radii = {
  sm: 6,
  md: 10,
  lg: 16,
} as const;

export const font = {
  body: 'system-ui, "Segoe UI", sans-serif',
  title: 600,
} as const;
