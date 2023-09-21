import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from 'src/contexts/auth';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { AuthRoutes } from './authRoutes';
import { HomeRoutes } from './homeRoutes';

const { Navigator: AuthNavigator, Screen: AuthScreen } = createStackNavigator();
const { Navigator: HomeNavigator, Screen: HomeScreen } = createStackNavigator();

function LoadingNavigator() {
  const { active } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!active) {
      navigation.navigate('CodeScreen' as never);
    }
  }, [active, navigation]);

  return null;
}

function AppNavigator() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? (
        <HomeNavigator screenOptions={{ headerShown: false }}>
          <HomeScreen name="HomeRoutes" component={HomeRoutes} />
        </HomeNavigator>
      ) : (
        <AuthNavigator screenOptions={{ headerShown: false }}>
          <AuthScreen name="AuthRoutes" component={AuthRoutes} />
        </AuthNavigator>
      )}
      <LoadingNavigator />
    </NavigationContainer>
  );
}

export default AppNavigator;
