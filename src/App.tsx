import { MantineProvider } from "@mantine/core";
import View from "./View";

function App() {

  const objects: { pos: number[], color: number[] }[] = [
    { 
      pos: [
        10, 20,
        80, 20,
        10, 30,
        10, 30,
        80, 20,
        80, 30,],
      color: [1.0, 0.0, 0.0, 1.0] 
    },
    { 
      pos: [
        10, 40,
        80, 40,
        10, 50,
        10, 50,
        80, 40,
        80, 50,],
      color: [0.0, 1.0, 0.0, 1.0] 
    },
    { 
      pos: [
        10, 60,
        80, 60,
        10, 70,
        10, 70,
        80, 60,
        80, 70,],
      color: [0.0, 0.0, 1.0, 1.0] 
    },

]


  return (
    <MantineProvider defaultColorScheme="auto">
      <View objects={objects}/>
    </MantineProvider>
  )
}

export default App
