import React from 'react';
import { Platform } from 'react-native';
import {
  createBottomTabNavigator,
  NavigationRouteConfig,
  NavigationScreenProp,
  NavigationState,
  getActiveChildNavigationOptions,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

interface Focused {
  focused: boolean;
}

const homeConfig: NavigationRouteConfig = {
  screen: HomeScreen,
  navigationOptions: {
    title: 'Home',
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }: Focused) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-information-circle${focused ? '' : '-outline'}`
            : 'md-information-circle'
        }
      />
    ),
  },
};

const linksConfig: NavigationRouteConfig = {
  screen: LinksScreen,
  navigationOptions: {
    title: 'Links',
    tabBarLabel: 'Links',
    tabBarIcon: ({ focused }: Focused) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
      />
    ),
  },
};

const settingsConfig: NavigationRouteConfig = {
  screen: SettingsScreen,
  navigationOptions: {
    title: 'Settings',
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused }: Focused) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
      />
    ),
  },
};

const tabNav = createBottomTabNavigator({
  Home: homeConfig,
  Links: linksConfig,
  Settings: settingsConfig,
});

tabNav.navigationOptions = ({
  navigation,
  screenProps,
}: {
  navigation: NavigationScreenProp<NavigationState>;
  screenProps: { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any
}) => {
  const childOptions = getActiveChildNavigationOptions(navigation, screenProps);
  return {
    title: childOptions.title,
  };
};

export default tabNav;
