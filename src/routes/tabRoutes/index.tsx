import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SettingsScreens } from '../settingsRoutes';
import { ProfileScreens } from '../profileRoutes';
import { HomeScreens } from '../homeRoutes';
import { ChatScreens } from '../chatRoutes';

const { Navigator: TabNavigator, Screen: TabScreen } = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <TabNavigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#28CD56',
        tabBarLabel: () => null,
        tabBarStyle: { height: 60, borderTopWidth: 1 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: typeof Ionicons.defaultProps;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Messages':
              iconName = focused ? 'chatbubble' : 'chatbubble-outline';
              break;
            case 'AllSettings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            case 'ProfileInfos':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = focused ? 'home' : 'home-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      initialRouteName="Home"
    >
      <TabScreen name="Home" component={HomeScreens} />
      <TabScreen name="Messages" component={ChatScreens} />
      <TabScreen name="AllSettings" component={SettingsScreens} />
      <TabScreen name="ProfileInfos" component={ProfileScreens} />
    </TabNavigator>
  );
}
