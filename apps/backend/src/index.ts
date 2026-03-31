import "dotenv/config";
import { serve } from "@hono/node-server";
import { BcryptPasswordHasher, JwtTokenService } from "@repo/auth/server";
import { createRepositories, getPrismaClient } from "@repo/database";
import { createApp } from "./create-app.js";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET is required");
}

const prisma = getPrismaClient();
const deps = {
  repos: createRepositories(prisma),
  tokens: new JwtTokenService(jwtSecret),
  passwords: new BcryptPasswordHasher(),
} as const;

const app = createApp(deps);
const port = Number(process.env.PORT ?? 3000);

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`backend listening on http://localhost:${info.port}`);
});
