# react-native-q-starter

An opinionated launch point for an react-native app already built with some very common features for most apps.

**Started with expo's tabs new project template.**

- 32SDK (react-native 0.57) / jest / react-navigation / testing utils

**Added typescript**

- eslint / ts-jest / @types
- minimal babel 7
- no "rn-cli-config.js" or weird babel transforms

**Additional Features**

- prettier (code formatting)
- husky (code format & test each commit and push)
- allTypes.d.ts (Common types & missing types)
- VS code integration once these extensions are installed
  - ESLint [install](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - Prettier [install](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - React Native Tools [install](https://marketplace.visualstudio.com/items?itemName=vsmobile.vscode-react-native)
- sentry-expo (production error tracking)
  - [app.json (extra)](https://docs.expo.io/versions/latest/workflow/configuration/#extra)
  - app.json (extra.sentryDNS) - https://sentry.io/settings/your-org/projects/your-project/keys/
  - app.json (extra.sentryEnable) - [Sentry.enableInExpoDevelopment](https://docs.expo.io/versions/latest/guides/using-sentry/)
  - [app.json (hooks)](https://docs.expo.io/versions/latest/guides/using-sentry/) - for sourcemaps

**ESLINT**

- rules based from react-native repo itself [link](https://github.com/facebook/react-native/blob/master/.eslintrc)
