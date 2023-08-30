import { createStackNavigator } from '@react-navigation/stack';
import { CodeScreen, InitialScreen, LoginScreen, RegisterScreen } from '../screens';

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="initial" component={InitialScreen} />
      <Screen name="login" component={LoginScreen} />
      <Screen name="register" component={RegisterScreen} />
      <Screen name="codeScreen" component={CodeScreen} />
    </Navigator>
  );
}
