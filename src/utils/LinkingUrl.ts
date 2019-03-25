import { Linking } from 'react-native';
import parseUrl, { URLParsed } from './parseUrl';

let urlParsed: URLParsed | null = null;

async function getLinkingInitialUrl(): Promise<URLParsed | null> {
  const url = await Linking.getInitialURL();
  if (!url) {
    return null;
  }
  urlParsed = parseUrl(url);
  return urlParsed;
}

function getLinkingInitialUrlMemo(): URLParsed | null {
  return urlParsed;
}

export { getLinkingInitialUrl };
export { getLinkingInitialUrlMemo };
