import { NativeBaseProvider } from 'native-base';
import { theme } from './src/theme';
import { Routes } from './src/routes';

function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Routes />
    </NativeBaseProvider>
  );
}

export default App;
