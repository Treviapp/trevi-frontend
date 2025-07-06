import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import styles from './Style';

const API_BASE = 'https://d891-2a0a-ef40-7ce-5901-69ea-63e0-95ad-9f48.ngrok-free.app';

export default function EnterEventScreen({ navigation }) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState(null);
  const [cardDetails, setCardDetails] = useState({});
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState(null);
  const { confirmPayment } = useStripe();

  const handleJoin = async () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      Alert.alert('Please enter a code');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/campaigns/guest/${trimmed}`);
      if (res.status === 404) {
        Alert.alert('Code not found');
      } else if (res.status === 410) {
        Alert.alert('This event has expired');
      } else if (res.ok) {
        const data = await res.json();
        setEvent(data);
      } else {
        Alert.alert('Unexpected error');
      }
    } catch (err) {
      Alert.alert('Network error', 'Check your connection');
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setPhoto(result.assets[0]);
    }
  };

  const handleDonate = async () => {
    if (!cardDetails.complete) {
      Alert.alert('Please enter card details');
      return;
    }

    setLoading(true);

    try {
      const paymentIntent = await fetch(`${API_BASE}/api/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 500,
          currency: 'gbp',
        }),
      }).then(res => res.json());

      const { clientSecret } = paymentIntent;

      const { error, paymentIntent: pi } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
      });

      if (error) {
        Alert.alert('Payment failed', error.message);
        return;
      }

      const formData = new FormData();
      formData.append('guest_code', code.trim().toUpperCase());
      formData.append('message', message);
      formData.append('amount', 500);
      if (photo) {
        const uriParts = photo.uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        formData.append('photo', {
          uri: photo.uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      await fetch(`${API_BASE}/api/donate`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Payment successful!');
      setMessage('');
      setPhoto(null);
    } catch (err) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {!event ? (
          <>
            <Text style={styles.label}>Enter Event Code</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. GUEST12"
              value={code}
              onChangeText={setCode}
              autoCapitalize="characters"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleJoin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.buttonText}>Join Event</Text>
              )}
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.label}>Welcome to {event.title}</Text>
            <Text style={styles.subLabel}>Hosted by {event.host}</Text>

            <CardField
              postalCodeEnabled={false}
              placeholder={{ number: '4242 4242 4242 4242' }}
              cardStyle={{ backgroundColor: '#fff' }}
              style={{ height: 50, marginVertical: 20 }}
              onCardChange={(cardDetails) => setCardDetails(cardDetails)}
            />

            <TextInput
              style={styles.input}
              placeholder="Write a message..."
              value={message}
              onChangeText={setMessage}
            />

            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={styles.buttonText}>
                {photo ? 'Change Photo' : 'Upload Photo (optional)'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={handleDonate}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.buttonText}>Donate</Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
