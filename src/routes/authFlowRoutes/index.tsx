import { createStackNavigator } from '@react-navigation/stack';
import { CodeScreen, InitialScreen, LoginScreen, RegisterScreen, SuccessScreen } from 'src/screens';

const { Navigator, Screen } = createStackNavigator();

export function AuthFlowRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="initial" component={InitialScreen} />
      <Screen name="login" component={LoginScreen} />
      <Screen name="register" component={RegisterScreen} />
      <Screen name="codeScreen" component={CodeScreen} />
      <Screen name="success" component={SuccessScreen} />
    </Navigator>
  );
}
