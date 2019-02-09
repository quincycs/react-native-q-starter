# react-native-q-starter

An opinionated launch point for an react-native app already built with some very common features for most apps.

**Started with expo's tabs new project template.**

- 32SDK / jest / react-navigation / testing utils

**Added typescript**

- [tutorial link](https://medium.com/@dai_shi/creating-a-minimal-expo-react-native-project-with-typescript-and-jest-5979ab8d7c15)
- tslint / ts-jest / @types
- removal of babel!

**Modifications**

- "skipLibCheck": true
  - gets rid of typescript errors showing up inside dependencies.

**Additional Features**

- prettier (code formatting)
- husky (code format & test each commit and push)
- allTypes.d.ts (Common types & missing types)
- sentry-expo (production error tracking)
  - [app.json (extra)](https://docs.expo.io/versions/latest/workflow/configuration/#extra)
  - app.json (extra.sentryDNS) - https://sentry.io/settings/your-org/projects/your-project/keys/
  - app.json (extra.sentryEnable) - [Sentry.enableInExpoDevelopment](https://docs.expo.io/versions/latest/guides/using-sentry/)
  - app.json [hooks](https://docs.expo.io/versions/latest/guides/using-sentry/) - for sourcemaps
