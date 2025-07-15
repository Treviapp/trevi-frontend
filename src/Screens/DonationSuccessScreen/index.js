import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './Style';
import DonationSuccessBackground from '../DonationSuccessBackground';

export default function DonationSuccessScreen({ navigation }) {
  return (
    <DonationSuccessBackground>
      <Text style={styles.title}>Thank You!</Text>
      <Text style={styles.message}>Your gift has been sent successfully.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Welcome')}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </DonationSuccessBackground>
  );
}
