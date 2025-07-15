import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './Style';
import WelcomeBackground from '../WelcomeBackground'; // ✅ use new background

export default function WelcomeScreen({ navigation, onLayout }) {
  return (
    <WelcomeBackground onLayout={onLayout}>
      <Text style={styles.title}>Welcome to Trevi</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreateEvent')}
      >
        <Text style={styles.buttonText}>Create a New Event</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EnterEvent')}
      >
        <Text style={styles.buttonText}>Enter Event Code to Donate</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AccessEvent')}
      >
        <Text style={styles.buttonText}>Access My Event</Text>
      </TouchableOpacity>
    </WelcomeBackground>
  );
}
