import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Style'; // ✅ Use shared Style.js
import CreateEventSuccessBackground from '../CreateEventSuccessBackground';

export default function CreateEventSuccessScreen({ route, navigation }) {
  const { hostCode, guestCode, eventName, fullName } = route.params;

  const handleContinue = () => {
    navigation.navigate('HostDashboard', {
      hostCode,
      eventName,
      fullName,
    });
  };

  return (
    <CreateEventSuccessBackground>
      <View style={styles.container}>
        <Text style={styles.title}>🎉 Event Created!</Text>

        <Text style={styles.label}>Host Code:</Text>
        <Text style={styles.code}>{hostCode}</Text>

        <Text style={styles.label}>Guest Code:</Text>
        <Text style={styles.code}>{guestCode}</Text>

        <Text style={styles.note}>
          Share the guest code with your friends so they can donate to your event.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </CreateEventSuccessBackground>
  );
}
