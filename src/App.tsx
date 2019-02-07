import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon, Constants } from 'expo';
import Sentry from 'sentry-expo';

import AppNavigator from './navigation/AppNavigator';

if (Constants.manifest.extra.sentryEnable) {
  Sentry.enableInExpoDevelopment = true;
  Sentry.config(Constants.manifest.extra.sentryDSN).install();
}

interface Props {
  skipLoadingScreen?: boolean;
}
interface State {
  isLoadingComplete: boolean;
}

export default class App extends React.Component<Props, State> {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
        <AppNavigator />
      </View>
    );
  }

  loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  handleLoadingError = (error: Error) => {
    Sentry.captureException(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
    // Sentry.captureMessage('launch');
    // try {
    //   throw new Error('just a test');
    // } catch (err) {
    //   Sentry.captureException(err);
    // }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
