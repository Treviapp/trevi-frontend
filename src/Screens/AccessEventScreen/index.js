import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './Style';
import AccessEventBackground from '../AccessEventBackground';
import { client } from '../../api/config'; // ✅ Add this line

export default function AccessEventScreen({ navigation }) {
  const [hostCode, setHostCode] = useState('');

  const handleAccess = async () => {
    if (!hostCode.trim()) {
      Alert.alert('Validation', 'Please enter your host code.');
      return;
    }

    try {
      const response = await client.get(`/campaigns/host/${hostCode.trim()}`);

      if (response.data) {
        console.log('✅ Host code valid, navigating to dashboard');
        navigation.navigate('HostDashboard', { hostCode });
      } else {
        Alert.alert('Error', 'Campaign not found.');
      }
    } catch (error) {
      console.error('❌ Error validating host code:', error.message);
      Alert.alert('Error', 'Campaign not found.');
    }
  };

  return (
    <AccessEventBackground>
      <Text style={styles.title}>Access Your Event</Text>

      <TextInput
        style={styles.input}
        placeholder="Host Code"
        value={hostCode}
        onChangeText={setHostCode}
      />

      <TouchableOpacity style={styles.button} onPress={handleAccess}>
        <Text style={styles.buttonText}>Access Event</Text>
      </TouchableOpacity>
    </AccessEventBackground>
  );
}