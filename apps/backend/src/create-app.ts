import { Hono } from "hono";
import { cors } from "hono/cors";
import type { AppDependencies } from "./deps.js";
import { registerAuthRoutes } from "./routes/auth.js";
import { registerTaskRoutes } from "./routes/tasks.js";

/** Composes HTTP routes and cross-cutting middleware; easy to test with injected deps. */
export function createApp(deps: AppDependencies) {
  const app = new Hono();
  app.use("/*", cors({ origin: "*" }));
  registerAuthRoutes(app, deps);
  registerTaskRoutes(app, deps);
  return app;
}
