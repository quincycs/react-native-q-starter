declare module 'react-navigation/NavigationTestUtils';
declare module '@expo/samples';
declare module '@expo/vector-icons';

// generics
type Optional<T> = T | undefined;
interface Dictionary<T> {
  [key: string]: T | undefined;
}

// built-in types
// type Readonly<T> = { readonly [P in keyof T]: T[P]; };
// type Partial<T> = { [P in keyof T]?: T[P]; };
