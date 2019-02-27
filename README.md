# react-native-q-starter

An opinionated launch point for an react-native app already built with some very common features for most apps.

**Started with expo's tabs new project template.**

- 32SDK (react-native 0.57) / jest / react-navigation / testing utils

**Added typescript**

- ts-jest / @types
- eslint
  - rules based from react-native repo itself. [link](https://github.com/facebook/react-native/blob/master/.eslintrc)
- minimal babel 7
  - no "rn-cli-config.js" or weird babel transforms

**Additional Features**

- prettier (code formatting)
- husky (code format & test each commit and push)
- allTypes.d.ts (Common types & missing types)
- sentry-expo (production error tracking)
  - [app.json (extra)](https://docs.expo.io/versions/latest/workflow/configuration/#extra)
  - app.json (extra.sentryDNS) - https://sentry.io/settings/your-org/projects/your-project/keys/
  - app.json (extra.sentryEnable) - [Sentry.enableInExpoDevelopment](https://docs.expo.io/versions/latest/guides/using-sentry/)
  - [app.json (hooks)](https://docs.expo.io/versions/latest/guides/using-sentry/) - for sourcemaps

## Setup from fresh OS

- Install Node8 and Yarn
  - Mac
    - Homebrew [install](https://brew.sh/)
    - `brew install node@8` then `brew link node@8`
    - `brew install yarn --without-node` [more info](https://formulae.brew.sh/formula/yarn)
  - Windows
    - Node [install](https://nodejs.org/dist/latest-v8.x/). I'd try the "-x64.msi" one.
    - Yarn [install](https://yarnpkg.com/lang/en/docs/install/#windows-stable).
  - Verify node version: `node -v` says version 8.
- Download this github repo as a .zip
- Rename various placeholder names for your project.
  - Package.json - "name"
  - app.json - "name" / "slug".
  - Oh and the 'react-native-q-starter' folder ;)
- `yarn install`
- `yarn start`

## Recommended IDE & Extensions

- VS code [install](https://code.visualstudio.com/)
- VS code integration should just work after installing these extensions:
  - ESLint [install](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - Prettier [install](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - React Native Tools [install](https://marketplace.visualstudio.com/items?itemName=vsmobile.vscode-react-native)
  - Visual Studio IntelliCode [install](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)

## Process for keeping up to date

Update schedule: ~1 month after new expo SDK release. This gives the SDK some time to soak.

**Below is my plan on updating package.json**

NEW-TABS:
Create a temporary new project via: `expo -init`.
Generate the tabs project.
Look at the package.json for dependency versions.

TYPES:
Align @types/XYZ with the closest version of XYZ. (Sometimes you won’t get full alignment. In that case choose a version lower.)

NEW-SDK-BLOG:
The [Expo Blog](https://blog.expo.io/) always publishes a post when SDK is released about breaking changes / how to update dependencies.

ALIGN-JEST-TS:
Align version with supported jest version and typescript version. Look at the latest version that supports our jest & typescript versions. Open package.json and search for "jest" , "typescript". [link](https://github.com/kulshekhar/ts-jest/blob/master/package.json)

RN:
Look at [react-native's package.json](https://github.com/facebook/react-native/blob/master/package.json) and consider using the same eslint plugins. (e.g. adding any plugin that they have.)

```
"dependencies": {
   "@expo/samples": NEW-TABS
   "@expo/vector-icons": NEW-TABS
   "expo": NEW-TABS
   "react": NEW-TABS
   "react-native": NEW-TABS
   "react-navigation": NEW-TABS
   "sentry-expo": NEW-SDK-BLOG
 },
 "devDependencies": {
   "@types/react-test-renderer": TYPES
   "@types/jest": TYPES
   "@types/react": TYPES
   "@types/react-navigation": TYPES
   "@types/expo": TYPES

   "@typescript-eslint/eslint-plugin": LATEST
   "husky": LATEST
   "prettier": LATEST

   "typescript": LATEST
   "ts-jest": ALIGN-JEST-TS

   "expo-cli": LATEST
   "jest-expo": NEW-TABS
   "react-test-renderer": NEW-TABS
   "babel-preset-expo": NEW-TABS
   "jest": NEW-TABS

   "eslint": RN
   "eslint-plugin-eslint-comments": RN
   "eslint-plugin-jest": RN
   "eslint-plugin-prettier": RN
   "eslint-plugin-react": RN
   "eslint-plugin-react-hooks": RN
   "eslint-plugin-react-native": RN
 },
```

**Plan for keeping eslintrc up to date:**

Consider keeping "plugins", "rules", "globals" in sync with [react-native's eslintrc](https://github.com/facebook/react-native/blob/master/.eslintrc). Keep personal / project preferences intact at the top of "rules". Don't use any flow plugins or flow related rules. VScode should complain about any duplicate rules.

**Plan for keeping tsconfig up to date:**

Inside allTypes.d.ts, re-evaluate any `declare module "XXX";`. Overtime these modules might exist in the dependency already or via DefinitelyTyped via npm `@types/XXX`.

Inside tsconfig.json, "types" should be any "@types/" we have inside our package.json. This is how we resolve conflicting types. Try removing "types" which will cause tsc include all types, and you'll see the errors that are being avoided.
