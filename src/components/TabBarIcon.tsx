import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

interface Props {
  name: string;
  focused: boolean;
}

const styles = StyleSheet.create({
  margin: { marginBottom: -3 },
});

export default (props: Props) => {
  const { name, focused } = props;
  return (
    <Ionicons
      name={name}
      size={26}
      style={styles.margin}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
};
