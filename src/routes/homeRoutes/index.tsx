import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SettingsScreens } from '../settingsRoutes';

const { Navigator: TabNavigator, Screen: TabScreen } = createBottomTabNavigator();

export function HomeRoutes() {
  return (
    <TabNavigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <TabScreen name="AllSettings" component={SettingsScreens} />
    </TabNavigator>
  );
}
