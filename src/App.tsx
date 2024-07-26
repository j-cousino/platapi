import { MantineProvider } from "@mantine/core";
import View from "./View";

function App() {
  const positions: number[] = [
    0, 0,
    0, 0.5,
    0.7, 0,
  ];

  return (
    <MantineProvider defaultColorScheme="auto">
      <View positions={positions}/>
    </MantineProvider>
  )
}

export default App
