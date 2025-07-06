import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StripeProvider } from '@stripe/stripe-react-native';

import WelcomeScreen from './src/Screens/WelcomeScreen';
import CreateEventScreen from './src/Screens/CreateEventScreen';
import AccessEventScreen from './src/Screens/AccessEventScreen';
import EnterEventScreen from './src/Screens/EnterEventScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51RXKLjIZnBW7XxVHPtSeoAYKhtociVXJBLkNZMRYAHCavTbvfvzVRqIAti7YZhpOGYYeSSIDRbWI9HkpPbbjIxcO00oNBUdUzM">
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateEvent"
            component={CreateEventScreen}
            options={{ title: 'Create Event' }}
          />
          <Stack.Screen
            name="AccessEvent"
            component={AccessEventScreen}
            options={{ title: 'Access My Event' }}
          />
          <Stack.Screen
            name="EnterEvent"
            component={EnterEventScreen}
            options={{ title: 'Enter Event' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}
