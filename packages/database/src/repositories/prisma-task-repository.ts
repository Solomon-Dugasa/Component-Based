import type { PrismaClient } from "@prisma/client";
import type { CreateTaskInput, ITaskRepository, TaskDTO } from "../contracts.js";

export class PrismaTaskRepository implements ITaskRepository {
  constructor(private readonly db: PrismaClient) {}

  async list(): Promise<TaskDTO[]> {
    const rows = await this.db.task.findMany({ orderBy: { createdAt: "desc" } });
    return rows.map((r) => ({
      id: r.id,
      title: r.title,
      createdAt: r.createdAt.toISOString(),
    }));
  }

  async create(input: CreateTaskInput): Promise<TaskDTO> {
    const r = await this.db.task.create({ data: { title: input.title } });
    return {
      id: r.id,
      title: r.title,
      createdAt: r.createdAt.toISOString(),
    };
  }
}
