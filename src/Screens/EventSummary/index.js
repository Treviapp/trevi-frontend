import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Style';

export default function EventSummary({ route, navigation }) {
  const { eventName, fullName, email, hostCode, guestCode } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Created!</Text>

      <View style={styles.infoBox}>
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
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Welcome')}
      >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}
