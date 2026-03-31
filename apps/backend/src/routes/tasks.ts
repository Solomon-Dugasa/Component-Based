import type { Hono } from "hono";
import type { AppDependencies } from "../deps.js";

export function registerTaskRoutes(app: Hono, deps: AppDependencies) {
  app.get("/tasks", async (c) => {
    const tasks = await deps.repos.tasks.list();
    return c.json({ tasks });
  });

  app.post("/tasks", async (c) => {
    const auth = c.req.header("Authorization") ?? "";
    const m = /^Bearer\s+(\S+)$/i.exec(auth);
    if (!m) return c.json({ error: "unauthorized" }, 401);
    const claims = deps.tokens.verify(m[1]);
    if (!claims) return c.json({ error: "unauthorized" }, 401);

    const body = await c.req.json<{ title?: string }>();
    if (!body.title?.trim()) {
      return c.json({ error: "title required" }, 400);
    }
    const task = await deps.repos.tasks.create({ title: body.title.trim() });
    return c.json({ task });
  });
}
