import { StatusBar } from "expo-status-bar";
import { TaskBoardScreen } from "./src/screens/TaskBoardScreen";

export default function App() {
  return (
    <>
      <TaskBoardScreen />
      <StatusBar style="dark" />
    </>
  );
}
