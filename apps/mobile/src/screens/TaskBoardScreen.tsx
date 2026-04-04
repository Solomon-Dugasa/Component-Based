import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors, space } from "@repo/ui/tokens";
import type { TaskDTO } from "@repo/database/contracts";
import { fetchTasks } from "../lib/api";

/**
 * Screen composes RN primitives and shared design tokens.
 * Domain types come from @repo/database/contracts; styling aligns with web via @repo/ui/tokens.
 */
export function TaskBoardScreen() {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      setTasks(await fetchTasks());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Study Hall</Text>
      <Text style={styles.sub}>
        Same API and DTO contracts as web; native layout composed locally.
      </Text>
      <Pressable style={styles.button} onPress={() => void load()}>
        <Text style={styles.buttonLabel}>Refresh</Text>
      </Pressable>
      {loading ? <ActivityIndicator color={colors.accent} /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.rowText}>{item.title}</Text>
          </View>
        )}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.muted}>No tasks yet (backend running?).</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
    padding: space.lg,
    paddingTop: space.xl * 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.text,
    marginBottom: space.sm,
  },
  sub: {
    color: colors.muted,
    marginBottom: space.md,
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: colors.accent,
    paddingVertical: space.sm,
    paddingHorizontal: space.md,
    borderRadius: 8,
    marginBottom: space.md,
  },
  buttonLabel: { color: "#fff", fontWeight: "600" },
  error: { color: "#b91c1c", marginBottom: space.sm },
  list: { paddingBottom: space.xl },
  row: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: space.md,
    marginBottom: space.sm,
  },
  rowText: { color: colors.text },
  muted: { color: colors.muted, marginTop: space.md },
});
