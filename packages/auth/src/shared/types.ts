/** Portable session claims — safe to import from mobile or web without Node-only deps. */

export type SessionClaims = {
  sub: string;
  email: string;
};
