import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';

import AppLoading from 'expo-app-loading'; /* Keep the Splash Screen until Preloading is Finished (Fonts, Images, etc.) */
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Asset, useAssets } from 'expo-asset';

/* [Step 1 ~ Step 3] Not Necessary for Step 4 */
/* const loadFonts = (fonts) => fonts.map((font) => {
  return Font.loadAsync(font);
});

const loadImages = (images) => images.map((image) => {
  if (typeof image === "string") return Image.prefetch(image);
  else return Asset.loadAsync(image);
}); */

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
  const [assets] = useAssets([require('./assets/test.jpg')]); /* Cannot Use External Image URLs via Image.prefetch() */
  const [fonts] = Font.useFonts(Ionicons.font);
  
  if (!assets || !fonts) {
    /* [Step 1 ~ Step 3] Not Necessary for Step 4, AllLoading Props are Also Deprecated */
    // return <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.warn} />;
    return <AppLoading />;
  }
  
/* Step 4 Only Preloads Assets → You Should Use Step 1 ~ Step 3 for Advanced Features (Initialize DB, Get User Profiles, Count Notifications, etc.) */

  return <Text>Hello!</Text>;
}