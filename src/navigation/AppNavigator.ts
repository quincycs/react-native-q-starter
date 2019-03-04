import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from './AuthNavigator';

function createAppContainerWithRoute(initialRouteName: string) {
  return createAppContainer(
    createSwitchNavigator(
      {
        Auth: AuthNavigator,
        Main: MainTabNavigator,
      },
      {
        initialRouteName,
      }
    )
  );
}

export { createAppContainerWithRoute };
