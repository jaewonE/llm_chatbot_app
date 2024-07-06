import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyChatList from '../screens/myChatList';
import TotalChatList from '../screens/totalChatList';
import Setting from '../screens/setting';

const Tab = createBottomTabNavigator();

const screenOptions = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    let iconName;

    if (route.name === 'My chat') {
      iconName = focused ? 'chatbox' : 'chatbox-outline';
    } else if (route.name === 'All chat') {
      iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
    } else if (route.name === 'Setting') {
      iconName = focused ? 'settings' : 'settings-outline';
    }

    // You can return any component that you like here!
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: 'tomato',
  tabBarInactiveTintColor: 'gray',
  tabBarStyle: {
    paddingBottom: 5,
    height: 60,
  },
  tabBarLabelStyle: {
    fontSize: 12,
  },
});

const TabRouter = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="My chat" component={MyChatList} />
      <Tab.Screen name="All chat" component={TotalChatList} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
};

export default TabRouter;
