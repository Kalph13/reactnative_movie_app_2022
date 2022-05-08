import 'react-native-gesture-handler'; /* For the Drawer Navigator */

/* Environment Setting: https://reactnative.dev/docs/environment-setup */
/* Create React Native App (Incl. Expo SDK): https://github.com/expo/create-react-native-app */
/* Check Physical Device Connection: 'adb devices' in Shell */

import React, { useState } from 'react';
import { View, Text, Image, useColorScheme, LogBox } from 'react-native';
LogBox.ignoreLogs(["Setting a timer"]);

/* AppLoading: https://docs.expo.dev/versions/latest/sdk/app-loading */
/* Keeps the Splash Screen until Preloading is Finished (Fonts, Images, etc.) */
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Asset, useAssets } from 'expo-asset';

/* React Navigation: https://reactnavigation.org/docs/getting-started */
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Root } from './navigation/Root';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './styled';

/* React Query: https://react-query.tanstack.com */
import { QueryClient, QueryClientProvider } from 'react-query'

/* [Step 1 ~ Step 3] Not Necessary for Step 4 */
/* const loadFonts = (fonts) => fonts.map((font) => {
  return Font.loadAsync(font);
});

const loadImages = (images) => images.map((image) => {
  if (typeof image === "string") return Image.prefetch(image);
  else return Asset.loadAsync(image);
}); */

const queryClient = new QueryClient();

export default function App() {
  /* [Step 1 ~ Step 3] Not Necessary for Step 4 */
  // const [ready, setReady] = useState(false);
  // const onFinish = () => setReady(true);
  
  /* [Step 1 ~ Step 3] Not Necessary for Step 4 */
  /* All Preloaded Assets (Require 'await') Come Here */
  // const startLoading = async () => {
    /* [Step 1] Finish 'startLoading()' and Run 'onFinish()' when All Promises are Resolved */
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    
    /* [Step 2] Preload Assets Individually */
    // await Font.loadAsync(Ionicons.font);
    // await Asset.loadAsync(require('./assets/test.jpg'));
    // await Image.prefetch('https://reactnative.dev/img/oss_logo.png')

    /* [Step 3] Preload Assets using Functions */
    // const fonts = loadFonts([Ionicons.font]);
    // const images = loadImages([require('./assets/test.jpg'), 'https://reactnative.dev/img/oss_logo.png']);
    /* Wait until All Promises are Resolved */
    // await Promise.all([...fonts, ...images]);
  // };

  /* [Step 4]  Use 'useFont()' and 'useAsset()' for Preload */
  /* Step 4 Only Preloads Assets → You Should Use Step 1 ~ Step 3 for Advanced Features (Initialize DB, Get User Profiles, Count Notifications, etc.) */
  const [assets] = useAssets([require('./assets/test.jpg')]); /* Cannot Use External Image URLs via Image.prefetch() */
  const [fonts] = Font.useFonts(Ionicons.font);

  /* Light Mode ↔ Dark Mode w/DarkTheme and Default Theme */
  const isDark = useColorScheme() === "dark";
  // <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
  
  if (!assets || !fonts) {
    /* [Step 1 ~ Step 3] Not Necessary for Step 4, AllLoading Props are Also Deprecated */
    // return <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.warn} />;
    return <AppLoading />;
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}