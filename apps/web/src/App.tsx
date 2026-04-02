import { useCallback, useEffect, useState } from "react";
import { Button, Card, Stack } from "@repo/ui";
import { colors } from "@repo/ui/tokens";
import { createTask, fetchTasks, registerUser } from "./api";

/**
 * Page composes shared primitives (Card, Stack, Button) and local orchestration.
 * Data access stays behind api.ts so the view stays a thin component.
 */
export function App() {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("token"),
  );
  const [email, setEmail] = useState("student@example.com");
  const [password, setPassword] = useState("password123");
  const [title, setTitle] = useState("Read about component boundaries");
  const [tasks, setTasks] = useState<Awaited<ReturnType<typeof fetchTasks>>>(
    [],
  );
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      setTasks(await fetchTasks());
    } catch (e) {
      setError(e instanceof Error ? e.message : "load failed");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function onRegister() {
    setError(null);
    try {
      const { token: t } = await registerUser(email, password);
      localStorage.setItem("token", t);
      setToken(t);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "register failed");
    }
  }

  async function onAddTask() {
    if (!token) {
      setError("register first to obtain a token");
      return;
    }
    setError(null);
    try {
      await createTask(token, title);
      setTitle("");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "create failed");
    }
  }

  function signOut() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: colors.canvas,
        fontFamily: "system-ui, sans-serif",
        padding: 24,
      }}
    >
      <Stack gap="lg" style={{ maxWidth: 480, margin: "0 auto" }}>
        <Card title="Study Hall (web)">
          <Stack gap="md">
            <p style={{ margin: 0, color: colors.muted }}>
              Shared UI tokens and components from <code>@repo/ui</code>; API
              calls isolated in <code>api.ts</code>.
            </p>
            {error ? (
              <p style={{ color: "#b91c1c", margin: 0 }}>{error}</p>
            ) : null}
            <Stack gap="sm">
              <label style={{ fontSize: 14, color: colors.muted }}>
                Email
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: 4,
                    padding: 8,
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                  }}
                />
              </label>
              <label style={{ fontSize: 14, color: colors.muted }}>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: 4,
                    padding: 8,
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                  }}
                />
              </label>
              <Stack
                gap="sm"
                style={{ flexDirection: "row", flexWrap: "wrap" }}
              >
                <Button type="button" onClick={() => void onRegister()}>
                  Register / refresh session
                </Button>
                <Button type="button" variant="ghost" onClick={signOut}>
                  Sign out
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Card>

        <Card title="Tasks">
          <Stack gap="md">
            <Stack gap="sm" style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New task title"
                style={{
                  flex: "1 1 200px",
                  padding: 8,
                  borderRadius: 8,
                  border: `1px solid ${colors.border}`,
                }}
              />
              <Button type="button" onClick={() => void onAddTask()}>
                Add (Bearer)
              </Button>
            </Stack>
            <ul style={{ margin: 0, paddingLeft: 20, color: colors.text }}>
              {tasks.map((t) => (
                <li key={t.id} style={{ marginBottom: 8 }}>
                  {t.title}
                </li>
              ))}
            </ul>
          </Stack>
        </Card>
      </Stack>
    </main>
  );
}
