import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import styles from './Style';

const API_BASE = 'https://5952-2a0a-ef40-755-601-bd6a-bee2-93a5-aff4.ngrok-free.app';

export default function EnterEventScreen() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState(null);
  const [cardDetails, setCardDetails] = useState({});
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState(null);
  const { confirmPayment } = useStripe();

  /* ── media-library permission ── */
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission required',
          'We need access to your photos so you can attach one to your gift.',
        );
      }
    })();
  }, []);

  /* ── join event ── */
  const handleJoin = async () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return Alert.alert('Please enter a code');

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/campaigns/guest/${trimmed}`);
      if (res.ok) setEvent(await res.json());
      else if (res.status === 404) Alert.alert('Code not found');
      else if (res.status === 410) Alert.alert('This event has expired');
      else Alert.alert('Unexpected error');
    } catch {
      Alert.alert('Network error', 'Check your connection');
    } finally {
      setLoading(false);
    }
  };

  /* ── image picker ── */
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled && result.assets.length > 0)
      setPhoto(result.assets[0]);
  };

  /* ── donate ── */
  const handleDonate = async () => {
    if (!cardDetails.complete) return Alert.alert('Please enter card details');
    setLoading(true);

    try {
      /* 1. PaymentIntent: read once as text, then parse */
      const piRes = await fetch(`${API_BASE}/api/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 500, currency: 'gbp' }),
      });
      const raw = await piRes.text();

      let clientSecret = '';
      try {
        const parsed = JSON.parse(raw);
        clientSecret = parsed.clientSecret || parsed.client_secret;
      } catch {
        console.log('⚠️ paymentIntent raw response:', raw);
        throw new Error('Server error creating payment intent');
      }

      /* 2. confirm payment */
      const { error } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
      });
      if (error) return Alert.alert('Payment failed', error.message);

      /* 3. send donation */
      const form = new FormData();
      form.append('guest_code', code.trim().toUpperCase());
      form.append('message', message);
      form.append('amount', 500);
      if (photo) {
        const ext = photo.uri.split('.').pop();
        form.append('photo', { uri: photo.uri, name: `photo.${ext}`, type: `image/${ext}` });
      }

      await fetch(`${API_BASE}/api/donate`, {
        method: 'POST',
        body: form,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      Alert.alert('Payment successful!');
      setMessage('');
      setPhoto(null);
    } catch (err) {
      console.log('❌ donate error', err);
      Alert.alert('Error', err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  /* ── UI ── */
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
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
            <TouchableOpacity style={styles.button} onPress={handleJoin} disabled={loading}>
              {loading ? <ActivityIndicator /> : <Text style={styles.buttonText}>Join Event</Text>}
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.label}>Welcome to {event.title}</Text>
            <Text style={styles.subLabel}>Hosted by {event.host}</Text>

            <View style={{ width: '100%', marginVertical: 20 }}>
              <CardField
                postalCodeEnabled={false}
                placeholder={{ number: '4242 4242 4242 4242' }}
                cardStyle={{ backgroundColor: '#FFFFFF', textColor: '#000000' }}
                style={{ width: '100%', height: 50 }}
                onCardChange={setCardDetails}
              />
            </View>

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

            {photo && (
              <Image
                source={{ uri: photo.uri }}
                style={{ width: 200, height: 200, borderRadius: 8, alignSelf: 'center', marginVertical: 10 }}
              />
            )}

            <TouchableOpacity style={styles.button} onPress={handleDonate} disabled={loading}>
              {loading ? <ActivityIndicator /> : <Text style={styles.buttonText}>Donate</Text>}
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

