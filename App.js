import React, { useState } from 'react';
/* AppLoading: Keep the splash screen visible while the AppLoading component is mounted (cache fonts, logos, icon images, etc.) */
import AppLoading from 'expo-app-loading';
import { View, Text } from 'react-native';

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    /* await new Promise((resolve) => setTimeout(resolve, 5000)); */
  }; /* Every 'await' thing comes here */
  
  if (!ready) {
    return <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.warn} />;
  }
  
  return <Text>Hello!</Text>;
}