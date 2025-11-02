import React from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';
import Routes from './src/navigation/Routes';
import { STRIPE_PUBLISHABLE_KEY } from './src/api/config';

export default function App() {
  if (!STRIPE_PUBLISHABLE_KEY) {
    console.warn('Stripe publishable key is missing. Falling back to rendering without Stripe.');
    return <Routes />;
  }

  const maskedKey = `${STRIPE_PUBLISHABLE_KEY.slice(0, 10)}...${STRIPE_PUBLISHABLE_KEY.slice(-6)}`;
  console.log('Stripe publishable key in use:', maskedKey);

  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <Routes />
    </StripeProvider>
  );
}
