declare module 'react-navigation/NavigationTestUtils';
declare module 'expo';
declare module '@expo/samples';

// generics
type Optional<T> = T | undefined;
type Dictionary<T> = { [key: string]: T | undefined };

// built-in types
// type Readonly<T> = { readonly [P in keyof T]: T[P]; };
// type Partial<T> = { [P in keyof T]?: T[P]; };
