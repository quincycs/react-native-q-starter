import { Dimensions } from 'react-native';
/**
 * WARNING, ONLY USE WHEN APP IS ONLY PORTRAIT ALWAYS OR LANDSCSAPE ALWAYS
 */
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
