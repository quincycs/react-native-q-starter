import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from './AuthNavigator';

import DeepScreen from '../screens/DeepScreen';

const stacksOverTabs = createStackNavigator({
  Tabs: { screen: MainTabNavigator },
  Deep: { screen: DeepScreen },
});

function createAppContainerWithRoute(initialRouteName: string) {
  return createAppContainer(
    createSwitchNavigator(
      {
        Auth: { screen: AuthNavigator },
        Main: { screen: stacksOverTabs },
      },
      {
        initialRouteName,
      }
    )
  );
}

export { createAppContainerWithRoute };
