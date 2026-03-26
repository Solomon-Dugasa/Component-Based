/**
 * Persistence contracts — portable across apps without pulling Prisma into clients.
 * Consumers depend on interfaces, not ORM details (dependency inversion).
 */

export type TaskDTO = {
  id: string;
  title: string;
  createdAt: string;
};

export type CreateTaskInput = { title: string };

export interface ITaskRepository {
  list(): Promise<TaskDTO[]>;
  create(input: CreateTaskInput): Promise<TaskDTO>;
}

export type UserDTO = {
  id: string;
  email: string;
  createdAt: string;
};

export interface IUserRepository {
  findByEmail(email: string): Promise<UserDTO | null>;
  create(input: { email: string; passwordHash: string }): Promise<UserDTO>;
}
