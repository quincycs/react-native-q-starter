type StringKey =
  | 'authEmailNotFound'
  | 'authBadPassword'
  | 'authUserDisabled'
  | 'defaultServerError'
  | 'defaultClientError'
  | 'helloWorld'
  | 'helloWorldFormat';

type StringsType = { [key in StringKey]: string };
