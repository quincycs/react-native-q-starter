import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { NormalText } from '../components/StyledText';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

type Props = NavigationScreenProps;

export default class DeepScreen extends React.Component<Props> {
  protected static navigationOptions = {
    title: 'Deeper',
  };

  public render() {
    return (
      <View style={styles.container}>
        <NormalText>Hello world!</NormalText>
      </View>
    );
  }
}
