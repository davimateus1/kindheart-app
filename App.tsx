import { NativeBaseProvider, Text } from "native-base";
import { theme } from "./src/theme";

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Text color="brand.50">Test Custom Theme</Text>
    </NativeBaseProvider>
  );
}
