import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { client } from '../../api/config';
import styles from './Style';
import EventSummaryBackground from '../EventSummaryBackground';

export default function GuestSummaryScreen({ route, navigation }) {
  const guestCode = route?.params?.guestCode || '';
  const [loading, setLoading] = useState(true);
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    if (guestCode) {
      client
        .get(`/campaigns/guest/${guestCode}`)
        .then(({ data }) => {
          setCampaign(data);
        })
        .catch(err => {
          console.error('❌ GuestSummary error:', err.message);
          Alert.alert('Error', 'Could not load event.');
        })
        .finally(() => setLoading(false));
    }
  }, [guestCode]);

  if (loading) {
    return (
      <EventSummaryBackground>
        <ActivityIndicator size="large" />
      </EventSummaryBackground>
    );
  }

  if (!campaign) {
    return (
      <EventSummaryBackground>
        <Text style={styles.error}>Event not found.</Text>
      </EventSummaryBackground>
    );
  }

  return (
    <EventSummaryBackground>
      <Text style={styles.title}>🎉 {campaign.title}</Text>
      <Text style={styles.subtitle}>Hosted by {campaign.host}</Text>

      {campaign.host_image && (
        <Image
          source={{ uri: campaign.host_image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <Text style={styles.message}>
        {campaign.guest_message ||
          'Welcome and thank you for celebrating with me!'}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MakeDonation', { guestCode })}
      >
        <Text style={styles.buttonText}>Send a Gift</Text>
      </TouchableOpacity>
    </EventSummaryBackground>
  );
}
