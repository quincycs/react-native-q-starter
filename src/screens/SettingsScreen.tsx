import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

type Props = NavigationScreenProps;

export default class SettingsScreen extends React.Component<Props> {
  protected static navigationOptions = {
    title: 'app.json',
  };

  private onSignOutPress = () => {
    this.props.navigation.navigate('Auth');
  };

  public render() {
    return (
      <View style={styles.container}>
        <Button title='Sign out' onPress={this.onSignOutPress} />
      </View>
    );
  }
}
