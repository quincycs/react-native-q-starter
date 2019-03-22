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
  private onSignOutPress = () => {
    this.props.navigation.navigate('Auth');
  };

  private onNavPress = () => {
    this.props.navigation.navigate('Deep');
  };

  public render() {
    return (
      <View style={styles.container}>
        <Button title='Open deeper screen' onPress={this.onNavPress} />
        <Button title='Sign out' onPress={this.onSignOutPress} />
      </View>
    );
  }
}
