# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Deploy local build to IOS Device
Guide: https://docs.expo.dev/get-started/set-up-your-environment/?platform=ios&device=physical&mode=development-build

```
eas build --platform ios --profile development
```

Open Settings > Privacy & Security, scroll down to the Developer Mode list item and navigate into it.
Tap the switch to enable Developer Mode. After you do so, Settings presents an alert to warn you that Developer Mode reduces your device's security. To continue enabling Developer Mode, tap the alert's Restart button.
After the device restarts and you unlock it, the device shows an alert confirming that you want to enable Developer Mode. Tap Turn On, and enter your device passcode when prompted.

After the build is complete, scan the QR code in your terminal and tap Open with iTunes when it appears inside the Camera app.

## Deploy build for IOS device to production
