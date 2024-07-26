import { MantineProvider } from "@mantine/core";
import View from "./View";

function App() {

  return (
    <MantineProvider defaultColorScheme="auto">
      <View />
    </MantineProvider>
  )
}

export default App
