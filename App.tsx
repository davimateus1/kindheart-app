import { NativeBaseProvider } from "native-base";
import { theme } from "./src/theme";
import { ReactNode } from "react";
import { Routes } from "./src/routes";

const App = (): ReactNode => {
  return (
    <NativeBaseProvider theme={theme}>
      <Routes />
    </NativeBaseProvider>
  );
};

export default App;
