export interface URLParsed {
  pathname: string;
  args: Record<string, string>;
}

export default function parseUrl(url: string): URLParsed {
  const urlSplit = url.split('?');
  const pathPart = urlSplit[0];
  const pathNameSplit = pathPart.split('/');
  const obj: URLParsed = {
    pathname: pathNameSplit[pathNameSplit.length - 1],
    args: {},
  };

  const queryPart = urlSplit[1];
  if (queryPart) {
    const queryStr = queryPart.split('#')[0];
    const params = queryStr.split('&');
    const argsObj: Record<string, string> = obj.args;
    params.forEach(paramPairStr => {
      if (paramPairStr) {
        const paramPair = paramPairStr.split('=');
        const argName = paramPair[0];
        const argVal = decodeURIComponent(paramPair[1]);
        argsObj[argName] = argVal;
      }
    });
  }
  return obj;
}
