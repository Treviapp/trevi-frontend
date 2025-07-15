import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Trevi Stack
import AppStack from './AppStack';

// Screens
import Splash from '../Screens/Splash';
import Carousal from '../Screens/Carousal';

// Redux Imports (optional – you can remove if not using Redux anymore)
import { useSelector } from 'react-redux';
import { isReadyRef, navigationRef } from './LinkingNavigator';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Carousal" component={Carousal} />
        <Stack.Screen name="App" component={AppStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;


