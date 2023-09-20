import { createStackNavigator } from '@react-navigation/stack';
import { CodeScreen, InitialScreen, LoginScreen, RegisterScreen, SuccessScreen } from 'src/screens';

const { Navigator: StackNavigator, Screen: StackScreen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <StackNavigator screenOptions={{ headerShown: false }} initialRouteName="Initial">
      <StackScreen name="Initial" component={InitialScreen} />
      <StackScreen name="Login" component={LoginScreen} />
      <StackScreen name="Register" component={RegisterScreen} />
      <StackScreen name="CodeScreen" component={CodeScreen} />
      <StackScreen name="Success" component={SuccessScreen} />
    </StackNavigator>
  );
}
