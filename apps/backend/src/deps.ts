import type { IPasswordHasher, ITokenService } from "@repo/auth/server";
import type { Repositories } from "@repo/database";

/** Explicit dependency bag — routes depend on this shape, not concrete implementations. */
export type AppDependencies = {
  repos: Repositories;
  tokens: ITokenService;
  passwords: IPasswordHasher;
};
