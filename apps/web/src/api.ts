import type { TaskDTO } from "@repo/database/contracts";

const base = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export async function fetchTasks(): Promise<TaskDTO[]> {
  const res = await fetch(`${base}/tasks`);
  if (!res.ok) throw new Error("failed to load tasks");
  const data = (await res.json()) as { tasks: TaskDTO[] };
  return data.tasks;
}

export async function registerUser(email: string, password: string) {
  const res = await fetch(`${base}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as { token: string };
}

export async function createTask(token: string, title: string) {
  const res = await fetch(`${base}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as { task: TaskDTO };
}
