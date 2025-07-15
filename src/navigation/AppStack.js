import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Trevi Screens
import WelcomeScreen from '../Screens/WelcomeScreen';
import CreateEventScreen from '../Screens/CreateEventScreen';
import CreateEventSuccessScreen from '../Screens/CreateEventSuccessScreen';
import EnterEventScreen from '../Screens/EnterEventScreen';
import AccessEventScreen from '../Screens/AccessEventScreen';
import HostDashboardScreen from '../Screens/HostDashboardScreen';
import GuestSummaryScreen from '../Screens/GuestSummaryScreen';
import MakeDonationScreen from '../Screens/MakeDonationScreen';
import DonationSuccessScreen from '../Screens/DonationSuccessScreen';
import EventSummary from '../Screens/EventSummary'; // Optional

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
      <Stack.Screen name="CreateEventSuccessScreen" component={CreateEventSuccessScreen} />
      <Stack.Screen name="EnterEvent" component={EnterEventScreen} />
      <Stack.Screen name="AccessEvent" component={AccessEventScreen} />
      <Stack.Screen name="HostDashboard" component={HostDashboardScreen} />
      <Stack.Screen name="GuestSummaryScreen" component={GuestSummaryScreen} />
      <Stack.Screen name="MakeDonation" component={MakeDonationScreen} />
      <Stack.Screen name="DonationSuccess" component={DonationSuccessScreen} />
      <Stack.Screen name="EventSummary" component={EventSummary} />
    </Stack.Navigator>
  );
};

export default AppStack;
