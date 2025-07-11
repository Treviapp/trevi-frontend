import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './src/Screens/WelcomeScreen';
import CreateEventScreen from './src/Screens/CreateEventScreen';
import EnterEventScreen from './src/Screens/EnterEventScreen';
import EventSummary from './src/Screens/EventSummary';
import AccessEventScreen from './src/Screens/AccessEventScreen';
import HostDashboardScreen from './src/Screens/HostDashboardScreen';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        console.log('⏳ Loading fonts...');
        await Font.loadAsync({
          'Poppins-Light': require('./src/Assets/fonts/Poppins-Light.ttf'),
          'Poppins-Regular': require('./src/Assets/fonts/Poppins-Regular.ttf'),
          'Poppins-Medium': require('./src/Assets/fonts/Poppins-Medium.ttf'),
          'Poppins-SemiBold': require('./src/Assets/fonts/Poppins-SemiBold.ttf'),
          'Poppins-Bold': require('./src/Assets/fonts/Poppins-Bold.ttf'),
        });
        console.log('✅ Fonts loaded');
      } catch (e) {
        console.warn('❌ Font loading failed:', e);
      } finally {
        console.log('✅ App is ready');
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      console.log('👋 Hiding splash screen');
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome">
          {props => <WelcomeScreen {...props} onLayout={onLayoutRootView} />}
        </Stack.Screen>
        <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
        <Stack.Screen name="EventSummary" component={EventSummary} />
        <Stack.Screen name="EnterEvent" component={EnterEventScreen} />
        <Stack.Screen name="AccessEvent" component={AccessEventScreen} />
        <Stack.Screen name="HostDashboard" component={HostDashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}