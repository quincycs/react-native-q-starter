import React from 'react';
import { Text, StyleProp, TextStyle, StyleSheet } from 'react-native';

interface Props {
  style?: StyleProp<TextStyle>;
  children: string;
}

const textStyles = StyleSheet.create({
  monoStyle: { fontFamily: 'space-mono' },
});

const MonoText = (props: Props) => {
  const { style } = props;
  return <Text {...props} style={[style, textStyles.monoStyle]} />;
};

export { MonoText };
export default {};
