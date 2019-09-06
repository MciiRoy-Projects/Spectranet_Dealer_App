import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const factor = (width + height) * 0.15;

export const RF = num => {
  num = num * factor;
  return num;
};

export const RH = num => {
  num = num / 100;
  num = num * height;
  return num;
};

export const RW = num => {
  num = num / 100;
  num = num * width;
  return num;
};
