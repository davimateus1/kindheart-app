import { createStackNavigator } from '@react-navigation/stack';
import {
  AllSettingsScreen,
  ElderlyStatuteScreen,
  ElderlyTipsScreen,
  HygieneScreen,
  SecurityScreen,
  EmergencyScreen,
  CommunicationScreen,
} from 'src/screens';

const { Navigator: StackNavigator, Screen: StackScreen } = createStackNavigator();

export function SettingsScreens() {
  return (
    <StackNavigator screenOptions={{ headerShown: false }} initialRouteName="Settings">
      <StackScreen name="Settings" component={AllSettingsScreen} />
      <StackScreen name="ElderlyStatute" component={ElderlyStatuteScreen} />
      <StackScreen name="Hygiene" component={HygieneScreen} />
      <StackScreen name="Tips" component={ElderlyTipsScreen} />
      <StackScreen name="Security" component={SecurityScreen} />
      <StackScreen name="Communication" component={CommunicationScreen} />
      <StackScreen name="Emergency" component={EmergencyScreen} />
    </StackNavigator>
  );
}
