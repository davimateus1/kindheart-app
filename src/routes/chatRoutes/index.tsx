import { createStackNavigator } from '@react-navigation/stack';
import { AllChatsScreen } from 'src/screens/chatScreens';

const { Navigator: StackNavigator, Screen: StackScreen } = createStackNavigator();

export function ChatScreens() {
  return (
    <StackNavigator screenOptions={{ headerShown: false }} initialRouteName="AllChats">
      <StackScreen name="AllChats" component={AllChatsScreen} />
    </StackNavigator>
  );
}
