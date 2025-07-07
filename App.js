import 'react-native-gesture-handler';             // keep first if you use gesture-handler
import React from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* ─────────  screen imports  ───────── */
import WelcomeScreen       from './src/Screens/WelcomeScreen';
import CreateEventScreen   from './src/Screens/CreateEventScreen';
import EnterEventScreen    from './src/Screens/EnterEventScreen';
import AccessEventScreen   from './src/Screens/AccessEventScreen';
import HostDashboardScreen from './src/Screens/HostDashboardScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51RXKLrIMEUGCmkevn3YDd0y1oRaPogoAAo5MpDFrMlfrM9YdO9ISBqrqaAl6kwoLQfQjScaaepDW8ZE0Tx7vyIKx00eiMFSmEZ">
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}  /* hide headers; adjust as you like */
        >
          <Stack.Screen name="Welcome"        component={WelcomeScreen} />
          <Stack.Screen name="CreateEvent"    component={CreateEventScreen} />
          <Stack.Screen name="AccessEvent"   component={AccessEventScreen} />
          <Stack.Screen name="EnterEvent" component={EnterEventScreen} />
          <Stack.Screen name="HostDashboard"  component={HostDashboardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}

