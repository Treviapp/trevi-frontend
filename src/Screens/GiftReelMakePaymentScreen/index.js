import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, Linking } from 'react-native';
import styles from './Style';
import HostDashboardBackground from '../HostDashboardBackground';
import { client } from '../../api/config';

export default function GiftReelMakePaymentScreen({ route, navigation }) {
  const { hostCode } = route.params;
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    try {
      setLoading(true);
      const res = await client.post('/giftreel/purchase', { host_code: hostCode });
      if (res.data?.url) {
        Linking.openURL(res.data.url); // opens Stripe checkout
      } else {
        Alert.alert('Error', 'Unable to start checkout.');
      }
    } catch (err) {
      console.error('❌ GiftReel checkout error:', err?.message);
      Alert.alert('Error', 'There was a problem starting your purchase.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <HostDashboardBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Your Trevi Gift Reel 🎬</Text>
        <Text style={styles.paragraph}>
          For just £4.99, we’ll create a short, personalised video keepsake of all
          your event’s gifts, messages and photos — perfect for sharing with family
          and friends.
        </Text>
        <Text style={styles.paragraph}>
          Please note: To protect privacy, images and videos will not be stored or
          retrievable after your event ends.
        </Text>

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={handlePurchase}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Buy Gift Reel (£4.99)</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </HostDashboardBackground>
  );
}
