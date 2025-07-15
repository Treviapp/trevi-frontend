import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  Image,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import styles from './Style';
import HostDashboardBackground from '../HostDashboardBackground';
import { client } from '../../api/config';

const FRONTEND_BASE = 'https://trevi.app/enter/';

export default function HostDashboardScreen({ route }) {
  const initialCode = route?.params?.hostCode || '';
  const [code, setCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState(null);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    if (initialCode) {
      handleLoadDashboard();
    }
  }, [initialCode]);

  const handleLoadDashboard = async () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      Alert.alert('Please enter your host code');
      return;
    }

    setLoading(true);
    try {
      const res = await client.get(`/campaigns/host/${trimmed}`);
      const data = res.data;

      setCampaign(data);
      setDonations(data.donations || []);
    } catch (err) {
      if (err.response?.status === 404) {
        Alert.alert('Campaign not found');
      } else if (err.message === 'Network Error') {
        Alert.alert('Network error', 'Check your connection');
      } else {
        Alert.alert('Unexpected error');
      }
    } finally {
      setLoading(false);
    }
  };

  const getTotalRaised = () =>
    donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <HostDashboardBackground>
      {!campaign && !initialCode ? (
        <>
          <Text style={styles.label}>Enter Your Host Code</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. HOST123"
            value={code}
            onChangeText={setCode}
            autoCapitalize="characters"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleLoadDashboard}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.buttonText}>View Dashboard</Text>
            )}
          </TouchableOpacity>
        </>
      ) : campaign ? (
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
          <Text style={styles.header}>🎉 {campaign.title}</Text>
          <Text style={styles.subHeader}>Hosted by {campaign.host}</Text>
          <Text style={styles.total}>
            Total Raised: £{(getTotalRaised() / 100).toFixed(2)}
          </Text>

          <Text style={styles.qrLabel}>Let others scan to donate:</Text>
          <QRCode
            value={`${FRONTEND_BASE}${campaign.guest_code}`}
            size={180}
          />

          {donations.map((donation, idx) => (
            <View key={idx} style={styles.donationCard}>
              {donation.photo_path && (
                <Image
                  source={{
                    uri: `${client.defaults.baseURL.replace('/api', '')}/storage/${donation.photo_path.replace('storage/', '')}`,
                  }}
                  style={styles.image}
                />
              )}
              <Text style={styles.message}>
                {donation.message || '(No message)'}
              </Text>
              <Text style={styles.amount}>
                £{(donation.amount / 100).toFixed(2)}
              </Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <ActivityIndicator style={{ marginTop: 50 }} />
      )}
    </HostDashboardBackground>
  );
}
