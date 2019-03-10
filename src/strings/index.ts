import { Localization } from 'expo';

import en from './en';

const strings: Dictionary<StringsType> = { en };
let locale = en; //default fallback

const deviceLocale = Localization.locale.split('-')[0];
if (strings[deviceLocale]) {
  locale = strings[deviceLocale] as StringsType;
}

function t(key: StringKey): string {
  return locale[key] as string;
}

function format(key: StringKey, ...values: string[]) {
  let str = t(key);
  for (let i = 0; i < values.length; i++) {
    str = str.replace(`{${i}}`, values[i]);
  }
  return str;
}

export default {
  t,
  format,
};
