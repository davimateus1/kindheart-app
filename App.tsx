import { NativeBaseProvider } from 'native-base';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'src/store/lib';
import { Routes } from 'src/routes';
import { theme } from 'src/theme';
import { AuthProvider } from 'src/contexts/auth';
import * as Font from 'expo-font';
import { useEffect } from 'react';

import PoppinsRegular from './assets/fonts/Poppins-Regular.ttf';
import PoppinsBold from './assets/fonts/Poppins-Bold.ttf';
import PoppinsSemiBold from './assets/fonts/Poppins-SemiBold.ttf';
import PoppinsMedium from './assets/fonts/Poppins-Medium.ttf';
import PoppinsExtraLight from './assets/fonts/Poppins-ExtraLight.ttf';
import PoppinsLight from './assets/fonts/Poppins-Light.ttf';
import PoppinsThin from './assets/fonts/Poppins-Thin.ttf';
import PoppinsExtraBold from './assets/fonts/Poppins-ExtraBold.ttf';
import PoppinsBlack from './assets/fonts/Poppins-Black.ttf';

function App() {
  const fetchFonts = async () => {
    Font.loadAsync({
      'Poppins-Regular': PoppinsRegular,
      'Poppins-Bold': PoppinsBold,
      'Poppins-Thin': PoppinsThin,
      'Poppins-Light': PoppinsLight,
      'Poppins-Black': PoppinsBlack,
      'Poppins-Medium': PoppinsMedium,
      'Poppins-SemiBold': PoppinsSemiBold,
      'Poppins-ExtraBold': PoppinsExtraBold,
      'Poppins-ExtraLight': PoppinsExtraLight,
    });
  };

  useEffect(() => {
    fetchFonts();
  }, []);

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
