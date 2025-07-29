import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styles from './Style';
import GiftListBackground from '../GiftListBackground';
import { client } from '../../api/config';

export default function GiftListScreen({ route }) {
  const hostCode = route?.params?.hostCode || '';
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hostCode) {
      fetchGifts();
    }
  }, [hostCode]);

  const fetchGifts = async () => {
    try {
      const res = await client.get(`/campaigns/host/${hostCode}`);
      const rawGifts = res.data.donations || [];

      // Filter duplicates based on payment_intent_id if available
      const seen = new Set();
      const uniqueGifts = rawGifts.filter((gift) => {
        const key = gift.payment_intent_id || `${gift.message}-${gift.amount}-${gift.created_at}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      setGifts(uniqueGifts);
    } catch (err) {
      console.error(err);
      Alert.alert('Error fetching gifts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GiftListBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>My Gifts</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#8e94f2" />
        ) : gifts.length === 0 ? (
          <Text style={styles.emptyText}>No gifts received yet.</Text>
        ) : (
          gifts.map((gift, index) => (
            <View key={index} style={styles.giftCard}>
              {gift.photo_path && (
                <Image
                  source={{
                    uri: gift.photo_path.startsWith('file://')
                      ? gift.photo_path
                      : `${client.defaults.baseURL.replace(
                          '/api',
                          ''
                        )}/storage/${gift.photo_path}`,
                  }}
                  style={styles.image}
                />
              )}
              <Text style={styles.name}>
                {gift.name?.trim() ? gift.name : 'Anonymous'}
              </Text>
              <Text style={styles.message}>
                {gift.message || '(No message)'}
              </Text>
              <Text style={styles.amount}>
                £{(gift.amount / 100).toFixed(2)}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </GiftListBackground>
  );
}

