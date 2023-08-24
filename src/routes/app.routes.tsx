import { createStackNavigator } from "@react-navigation/stack";
import { InitialScreen, LoginScreen } from "../screens";

const { Navigator, Screen } = createStackNavigator();

export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="initial" component={InitialScreen} />
      <Screen name="login" component={LoginScreen} />
    </Navigator>
  );
};
