import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from 'src/contexts/auth';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { ComponentType, useEffect } from 'react';
import { CreateFeedPostScreen, ProfileScreen, ChatScreen, ElderlyStatuteScreen } from 'src/screens';
import { AuthRoutes } from './authRoutes';
import { TabRoutes } from './tabRoutes';

const { Navigator, Screen } = createStackNavigator();

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
      <Navigator screenOptions={{ headerShown: false }}>
        {user === null ? (
          <Screen name="AuthRoutes" component={AuthRoutes} />
        ) : (
          <>
            <Screen name="TabRoutes" component={TabRoutes} />
            <Screen name="OtherUserProfile" component={ProfileScreen as ComponentType<unknown>} />
            <Screen name="Chat" component={ChatScreen as ComponentType<unknown>} />
            <Screen name="CreateFeedPost" component={CreateFeedPostScreen} />
            <Screen name="ElderlyStatute" component={ElderlyStatuteScreen} />
          </>
        )}
      </Navigator>

      <LoadingNavigator />
    </NavigationContainer>
  );
}

export default AppNavigator;
