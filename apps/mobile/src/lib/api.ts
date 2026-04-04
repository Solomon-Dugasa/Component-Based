import type { TaskDTO } from "@repo/database/contracts";

const base =
  process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

/** Thin transport layer — screens depend on this module, not raw fetch details. */
export async function fetchTasks(): Promise<TaskDTO[]> {
  const res = await fetch(`${base}/tasks`);
  if (!res.ok) throw new Error("Failed to load tasks");
  const data = (await res.json()) as { tasks: TaskDTO[] };
  return data.tasks;
}
