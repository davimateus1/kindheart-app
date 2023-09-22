import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from 'src/screens';

const { Navigator: StackNavigator, Screen: StackScreen } = createStackNavigator();

export function ProfileScreens() {
  return (
    <StackNavigator screenOptions={{ headerShown: false }} initialRouteName="Profile">
      <StackScreen name="Profile" component={ProfileScreen} />
    </StackNavigator>
  );
}
