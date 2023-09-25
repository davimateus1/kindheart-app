import { createStackNavigator } from '@react-navigation/stack';
import { FeedScreen } from 'src/screens';

const { Navigator: StackNavigator, Screen: StackScreen } = createStackNavigator();

export function HomeScreens() {
  return (
    <StackNavigator screenOptions={{ headerShown: false }} initialRouteName="Feed">
      <StackScreen name="Feed" component={FeedScreen} />
    </StackNavigator>
  );
}
