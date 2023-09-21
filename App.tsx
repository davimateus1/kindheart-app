import { NativeBaseProvider } from 'native-base';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'src/store/lib';
import { Routes } from 'src/routes';
import { theme } from 'src/theme';
import { AuthProvider } from 'src/contexts/auth';

function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}

export default App;
