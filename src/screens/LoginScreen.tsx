import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { NavigationScreenProps } from 'react-navigation';
import AppStorage from '../utils/AppStorage';
import { signInApi } from '../web/fireAuth';
// import { ApiFetchCancellation } from '../web/apiFetch';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

type Props = NavigationScreenProps;

export default class LoginScreen extends React.Component<Props> {
  protected static navigationOptions = {
    header: null,
  };

  private onLoginPress = async () => {
    const username =
      Constants.manifest.extra && Constants.manifest.extra.testUsername;
    const password =
      Constants.manifest.extra && Constants.manifest.extra.testPassword;

    /*
     *  DEMO OF BASIC USAGE
     */
    const result = await signInApi(username, password);
    console.log('LoginScreen API result:' + JSON.stringify(result));
    if (result.model) {
      AppStorage.setAuthToken(result.model);
      await AppStorage.saveAsync();
      this.props.navigation.navigate('Main');
    }
    if (result.error) {
      console.log('User Friendly Error DEMO :: ' + result.error.message);
    }

    /*
     *  DEMO OF CANCELLATION
     */
    // const cancelHandle = new ApiFetchCancellation();
    // const resultPromise = signInApi(username, password, cancelHandle);
    // setTimeout(() => {
    //   cancelHandle.cancel();
    // }, 100); // change this timing shorter or longer to see how the response changes.
    // const result = await resultPromise;
    // console.log('LoginScreen API result:' + JSON.stringify(result));
    // if (result.model) {
    //   AppStorage.setAuthToken(result.model);
    //   await AppStorage.saveAsync();
    //   this.props.navigation.navigate('Main');
    // }
    // if (result.error && result.error.code === 'CANCEL') {
    //   console.log('screen knows it was cancelled!');
    // }
  };

  public async componentDidMount() {
    /*
     * in order to reset app into freshly installed state,
     * delete any local storage of user and app.
     */
    await AppStorage.clearAsync();
  }

  public render() {
    return (
      <View style={styles.container}>
        <Button title='Login' onPress={this.onLoginPress} />
      </View>
    );
  }
}
