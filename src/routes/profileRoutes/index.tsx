import { createStackNavigator } from '@react-navigation/stack';
import { ComponentType } from 'react';
import { ProfileScreen } from 'src/screens';

const { Navigator: StackNavigator, Screen: StackScreen } = createStackNavigator();

export function ProfileScreens() {
  return (
    <StackNavigator screenOptions={{ headerShown: false }} initialRouteName="Profile">
      <StackScreen name="Profile" component={ProfileScreen as ComponentType<unknown>} />
    </StackNavigator>
  );
}
