import { createStackNavigator, NavigationRouteConfig } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';

const loginConfig: NavigationRouteConfig = {
  screen: LoginScreen,
};

export default createStackNavigator({
  Login: loginConfig,
});
