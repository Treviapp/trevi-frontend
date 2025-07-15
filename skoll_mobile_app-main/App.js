import { StripeProvider } from '@stripe/stripe-react-native';
import Routes from './src/navigation/Routes';

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51RXKLrIMEUGCmkevn3YDd0y1oRaPogoAAo5MpDFrMlfrM9YdO9ISBqrqaAl6kwoLQfQjScaaepDW8ZE0Tx7vyIKx00eiMFSmEZ">
      <Routes />
    </StripeProvider>
  );
} 