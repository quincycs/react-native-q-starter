import React from 'react';
import { ExpoConfigView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  protected static navigationOptions = {
    title: 'app.json',
  };

  public render() {
    return <ExpoConfigView />;
  }
}
