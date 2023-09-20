import { createStackNavigator } from '@react-navigation/stack';
import { useCallback, useEffect, useState } from 'react';
import { useAsyncStorage } from 'src/hooks';
import { AuthRoutes } from './authRoutes';
import { HomeRoutes } from './homeRoutes';

const { Navigator: StackNavigator, Screen: StackScreen } = createStackNavigator();

function AppRoutes() {
  const { getData } = useAsyncStorage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = useCallback(async () => {
    const token = await getData('token');
    setIsAuthenticated(!!token);
  }, [getData]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <StackNavigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <StackScreen name="Home" component={HomeRoutes} />
      ) : (
        <StackScreen name="Auth" component={AuthRoutes} />
      )}
    </StackNavigator>
  );
}

export default AppRoutes;
