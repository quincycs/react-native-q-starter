import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';
import Sentry from 'sentry-expo';

import { createAppContainerWithRoute } from './navigation/AppNavigator';
import AppStorage from './utils/AppStorage';
import { getLinkingInitialUrl } from './utils/LinkingUrl';

const { extra } = Constants.manifest;
if (extra && extra.sentryEnable) {
  Sentry.enableInExpoDevelopment = true;
  Sentry.config(extra.sentryDSN).install();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

interface Props {
  skipLoadingScreen?: boolean;
}
interface State {
  isLoadingComplete: boolean;
}

export default class App extends React.Component<Props, State> {
  public state = {
    isLoadingComplete: false,
  };

  private loadResourcesAsync = async () => {
    await Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
      AppStorage.loadAsync(),
      getLinkingInitialUrl(),
    ]);
  };

  private handleLoadingError = (error: Error) => {
    Sentry.captureException(error);
  };

  private handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
    // You could use sentry to record app launches
    // Sentry.captureMessage('launch', { level: 'info' });

    // try {
    //   throw new Error('just a test');
    // } catch (err) {
    //   Sentry.captureException(err);
    // }
  };

  public render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;
    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    const route = AppStorage.getIsLoggedIn() ? 'Main' : 'Auth';
    const AppNavigator = createAppContainerWithRoute(route);
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle='light-content' />}
        <AppNavigator />
      </View>
    );
  }
}
