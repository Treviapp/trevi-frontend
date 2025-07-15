import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/navigation/AppStack';
import { StripeProvider } from '@stripe/stripe-react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Poppins-Light': require('./src/Assets/fonts/Poppins-Light.ttf'),
          'Poppins-Regular': require('./src/Assets/fonts/Poppins-Regular.ttf'),
          'Poppins-Medium': require('./src/Assets/fonts/Poppins-Medium.ttf'),
          'Poppins-SemiBold': require('./src/Assets/fonts/Poppins-SemiBold.ttf'),
          'Poppins-Bold': require('./src/Assets/fonts/Poppins-Bold.ttf'),
        });
      } catch (e) {
        console.warn('❌ Font loading failed:', e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <StripeProvider publishableKey="pk_test_51RXKLrIMEUGCmkevn3YDd0y1oRaPogoAAo5MpDFrMlfrM9YdO9ISBqrqaAl6kwoLQfQjScaaepDW8ZE0Tx7vyIKx00eiMFSmEZ">
      <NavigationContainer onReady={onLayoutRootView}>
        <AppStack />
      </NavigationContainer>
    </StripeProvider>
  );
}
