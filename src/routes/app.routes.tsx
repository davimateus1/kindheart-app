import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "../screens";

const { Navigator, Screen } = createStackNavigator();

export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login} />
    </Navigator>
  );
};
