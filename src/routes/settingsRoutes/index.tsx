import { createStackNavigator } from '@react-navigation/stack';
import { AllSettingsScreen } from 'src/screens';

const { Navigator: StackNavigator, Screen: StackScreen } = createStackNavigator();

export function SettingsScreens() {
  return (
    <StackNavigator screenOptions={{ headerShown: false }} initialRouteName="Settings">
      <StackScreen name="Settings" component={AllSettingsScreen} />
    </StackNavigator>
  );
}
