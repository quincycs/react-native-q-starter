import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import AppStorage from '../utils/AppStorage';

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
    AppStorage.setAuthToken({
      idToken: '',
      refreshToken: '',
    });
    await AppStorage.saveAsync();
    this.props.navigation.navigate('Main');
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
