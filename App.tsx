import { NativeBaseProvider } from 'native-base';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'src/store/lib';
import { Routes } from 'src/routes';
import { theme } from 'src/theme';

function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}

export default App;
