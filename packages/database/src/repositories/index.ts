import type { PrismaClient } from "@prisma/client";
import type { ITaskRepository, IUserRepository } from "../contracts.js";
import { PrismaTaskRepository } from "./prisma-task-repository.js";
import { PrismaUserRepository } from "./prisma-user-repository.js";

export type Repositories = {
  tasks: ITaskRepository;
  users: IUserRepository;
};

/** Composition root for persistence — returns interface-typed facades only. */
export function createRepositories(db: PrismaClient): Repositories {
  return {
    tasks: new PrismaTaskRepository(db),
    users: new PrismaUserRepository(db),
  };
}
