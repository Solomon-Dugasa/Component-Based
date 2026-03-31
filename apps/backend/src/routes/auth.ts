import type { Hono } from "hono";
import type { AppDependencies } from "../deps.js";

export function registerAuthRoutes(app: Hono, deps: AppDependencies) {
  app.post("/auth/register", async (c) => {
    const body = await c.req.json<{ email?: string; password?: string }>();
    if (!body.email?.trim() || !body.password) {
      return c.json({ error: "email and password required" }, 400);
    }
    const email = body.email.trim();
    const existing = await deps.repos.users.findByEmail(email);
    if (existing) return c.json({ error: "email in use" }, 409);
    const passwordHash = await deps.passwords.hash(body.password);
    const user = await deps.repos.users.create({ email, passwordHash });
    const token = deps.tokens.sign({ sub: user.id, email: user.email });
    return c.json({ token, user: { id: user.id, email: user.email } });
  });

  app.post("/auth/login", async (c) => {
    const body = await c.req.json<{ email?: string; password?: string }>();
    if (!body.email?.trim() || !body.password) {
      return c.json({ error: "email and password required" }, 400);
    }
    const email = body.email.trim();
    const cred = await deps.repos.users.findCredentialByEmail(email);
    if (!cred) return c.json({ error: "invalid credentials" }, 401);
    const ok = await deps.passwords.verify(body.password, cred.passwordHash);
    if (!ok) return c.json({ error: "invalid credentials" }, 401);
    const token = deps.tokens.sign({ sub: cred.id, email: cred.email });
    return c.json({ token, user: { id: cred.id, email: cred.email } });
  });
}
