import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './Style';
import EnterEventBackground from '../EnterEventBackground';
import { client } from '../../api/config'; // ✅ axios instance

export default function EnterEventScreen({ navigation }) {
  const [code, setCode] = useState('');

  const handleJoin = async () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      Alert.alert('Validation', 'Please enter an event code.');
      return;
    }

    try {
      const response = await client.get(`/campaigns/guest/${trimmed}`);
      const campaign = response.data;

      console.log('✅ Guest campaign found:', campaign);

      // Navigate to guest summary view
      navigation.navigate('GuestSummaryScreen', {
        guestCode: campaign.code,
        title: campaign.title,
        host: campaign.host,
      });
    } catch (err) {
      console.error('❌ Guest code error:', err.message);
      Alert.alert('Error', 'Event not found. Please check your code.');
    }
  };

  return (
    <EnterEventBackground>
      <Text style={styles.title}>Enter Event Code</Text>

      <TextInput
        style={styles.input}
        placeholder="Guest Event Code"
        value={code}
        onChangeText={setCode}
        autoCapitalize="characters"
      />

      <TouchableOpacity style={styles.button} onPress={handleJoin}>
        <Text style={styles.buttonText}>Join Event</Text>
      </TouchableOpacity>
    </EnterEventBackground>
  );
}
