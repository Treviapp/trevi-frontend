import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './Style';
import { client } from '../../api/config'; // axios instance

export default function CreateEventScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [eventName, setEventName] = useState('');
  const [email, setEmail] = useState('');

  const handleCreate = () => {
    console.log('🔔 handleCreate pressed');

    // Basic validation
    if (!fullName.trim()) {
      Alert.alert('Validation', 'Please enter your full name.');
      return;
    }
    if (!eventName.trim()) {
      Alert.alert('Validation', 'Please enter an event name.');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Validation', 'Please enter your email.');
      return;
    }

    // API call to Laravel
    client
      .post('/campaigns', {
        name: eventName,
        creator_email: email,
        creator_name: fullName,
      })
      .then(({ data }) => {
        console.log('✅ API success:', data);

        // Navigate to EventSummary screen with data
        navigation.navigate('EventSummary', {
          eventName,
          fullName,
          email,
          hostCode: data.host_code,
          guestCode: data.guest_code,
        });
      })
      .catch(error => {
        console.log('❌ API error FULL:', JSON.stringify(error.response?.data, null, 2));
        console.log('❌ API error MSG:', error.message || error);

        Alert.alert(
          'Error',
          error.response?.data?.message ||
            'Something went wrong. Please check the console for details.'
        );
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Event</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={eventName}
        onChangeText={setEventName}
      />

      <TextInput
        style={styles.input}
        placeholder="Your Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Create Event</Text>
      </TouchableOpacity>
    </View>
  );
}
