import React from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';
import { registerRootComponent } from 'expo';
import Routes from './src/navigation/Routes';

export default function App() {
  return (
    <StripeProvider publishableKey="pk_live_51RXKLjIZnBW7XxVHInY17LFasEoyTuZB88ytB4LLScE7L113h1Qzgk19T2R9ROiNQ8TBUYvBIJ0yUPkLVSM9LuGB00EFXISZp1">
      <Routes />
    </StripeProvider>
  );
}

registerRootComponent(App);
