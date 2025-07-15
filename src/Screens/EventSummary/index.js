import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './Style';
import EventSummaryBackground from '../EventSummaryBackground'; // ✅ background wrapper

export default function EventSummary({ route, navigation }) {
  const { eventName, fullName, email, hostCode, guestCode } = route.params;

  return (
    <EventSummaryBackground>
      <Text style={styles.title}>Event Created!</Text>

      <Text style={styles.label}>Event Name:</Text>
      <Text style={styles.value}>{eventName}</Text>

      <Text style={styles.label}>Creator Name:</Text>
      <Text style={styles.value}>{fullName}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{email}</Text>

      <Text style={styles.label}>Host Code:</Text>
      <Text style={styles.code}>{hostCode}</Text>

      <Text style={styles.label}>Guest Code:</Text>
      <Text style={styles.code}>{guestCode}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Welcome')}
      >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </EventSummaryBackground>
  );
}
