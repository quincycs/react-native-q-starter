import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { NavigationScreenProps } from 'react-navigation';

import { MonoText, NormalText } from '../components/StyledText';
import { getLinkingInitialUrlMemo } from '../utils/LinkingUrl';
import parseUrl, { URLParsed } from '../utils/parseUrl';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

type Props = NavigationScreenProps;

export default class HomeScreen extends React.Component<Props> {
  private handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/development-mode'
    );
  };

  private handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };

  private maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this.handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    }
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode, your app will run at full speed.
      </Text>
    );
  }

  private handleOpenURL = (event: { url: string }) => {
    const result = parseUrl(event.url);
    this.navWithURLParsed(result);
  };

  private navWithURLParsed(url: URLParsed) {
    this.props.navigation.navigate({
      routeName: url.pathname,
      params: url.args,
    });
  }

  // test deeplinking via: xcrun simctl openurl booted "exp://127.0.0.1:19004/--/Deep?a=123&b=hello%20world"
  public componentDidMount() {
    const linkingObj = getLinkingInitialUrlMemo();
    if (linkingObj) {
      this.navWithURLParsed(linkingObj);
    }
    Linking.addEventListener('url', this.handleOpenURL);
  }

  public componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  public render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {this.maybeRenderDevelopmentModeWarning()}

            <Text style={styles.getStartedText}>Get started by opening</Text>

            <View
              style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
            >
              <MonoText style={styles.codeHighlightText}>
                screens/HomeScreen.js
              </MonoText>
            </View>

            <NormalText style={styles.getStartedText}>
              Change this text and your app will automatically reload.
            </NormalText>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity
              onPress={this.handleHelpPress}
              style={styles.helpLink}
            >
              <Text style={styles.helpLinkText}>
                Help, it didn’t automatically reload!
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
