import type { PrismaClient } from "@prisma/client";
import type { IUserRepository, UserDTO } from "../contracts.js";

export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly db: PrismaClient) {}

  async findByEmail(email: string): Promise<UserDTO | null> {
    const r = await this.db.user.findUnique({ where: { email } });
    if (!r) return null;
    return {
      id: r.id,
      email: r.email,
      createdAt: r.createdAt.toISOString(),
    };
  }

  async create(input: {
    email: string;
    passwordHash: string;
  }): Promise<UserDTO> {
    const r = await this.db.user.create({
      data: { email: input.email, passwordHash: input.passwordHash },
    });
    return {
      id: r.id,
      email: r.email,
      createdAt: r.createdAt.toISOString(),
    };
  }
}
