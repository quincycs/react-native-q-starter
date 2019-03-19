import React from 'react';
import { Text, StyleProp, TextStyle, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import FontFamilies from '../constants/FontFamilies';
import FontSizes from '../constants/FontSize';

interface Props {
  style?: StyleProp<TextStyle>;
  children: string;
}

const textStyles = StyleSheet.create({
  monoStyle: { fontFamily: 'space-mono' },
  normalStyle: {
    fontFamily: FontFamilies.NORMAL,
    fontSize: FontSizes.NORMAL,
    color: Colors.offBlack,
  },
});

const MonoText = (props: Props) => {
  return <Text {...props} style={[textStyles.monoStyle, props.style]} />;
};

const NormalText = (props: Props) => {
  return <Text {...props} style={[textStyles.normalStyle, props.style]} />;
};

export { MonoText };
export { NormalText };
