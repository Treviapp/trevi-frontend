import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import Routes from './src/navigation/Routes';
import { STRIPE_PUBLISHABLE_KEY } from './src/api/config';

export default function App() {
  if (!STRIPE_PUBLISHABLE_KEY) {
    console.warn('Stripe publishable key is missing. Falling back to rendering without Stripe.');
    return <Routes />;
  }

  const maskedKey = `${STRIPE_PUBLISHABLE_KEY.slice(0, 10)}...${STRIPE_PUBLISHABLE_KEY.slice(-6)}`;

  useEffect(() => {
    console.log('?? Stripe publishable key in use:', maskedKey);
    Alert.alert('Stripe publishable key in use', maskedKey);
  }, [maskedKey]);

  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <Routes />
    </StripeProvider>
  );
}
