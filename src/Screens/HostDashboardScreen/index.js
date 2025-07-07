import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const API_BASE = 'https://5952-2a0a-ef40-755-601-bd6a-bee2-93a5-aff4.ngrok-free.app';
const FRONTEND_BASE = 'https://trevi.app/enter/';

export default function HostDashboardScreen({ route }) {
  const initialCode = route?.params?.code || '';
  const [code, setCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState(null);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    if (initialCode) {
      console.log('🚀 useEffect running with code:', initialCode);
      handleLoadDashboard();
    }
  }, [initialCode]);

  const handleLoadDashboard = async () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      Alert.alert('Please enter your host code');
      return;
    }

    console.log('🔍 Fetching with code:', trimmed);

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/campaigns/host/${trimmed}`);
      console.log('📬 Response status:', res.status);

      if (res.status === 404) {
        Alert.alert('Campaign not found');
      } else if (res.ok) {
        const data = await res.json();
        console.log('✅ Campaign data:', data);
        setCampaign(data);
        setDonations(data.donations || []);
      } else {
        Alert.alert('Unexpected error');
      }
    } catch (err) {
      console.log('❌ Fetch error:', err.message);
      Alert.alert('Network error', 'Check your connection');
    } finally {
      setLoading(false);
    }
  };

  const getTotalRaised = () =>
    donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        <>
          <Text style={styles.header}>🎉 {campaign.title}</Text>
          <Text style={styles.subHeader}>Hosted by {campaign.host}</Text>
          <Text style={styles.total}>
            Total Raised: £{(getTotalRaised() / 100).toFixed(2)}
          </Text>

          <View style={styles.qrContainer}>
            <Text style={styles.qrLabel}>Let others scan to donate:</Text>
            <QRCode
              value={`${FRONTEND_BASE}${campaign.guest_code}`}
              size={180}
            />
          </View>

          {donations.map((donation, idx) => (
            <View key={idx} style={styles.donationCard}>
              {donation.photo_path && (
                <Image
                  source={{
                    uri: `${API_BASE}/storage/${donation.photo_path.replace(
                      'storage/',
                      '',
                    )}`,
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
        </>
      ) : (
        <ActivityIndicator style={{ marginTop: 50 }} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 18, marginBottom: 10 },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2e86de',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', textAlign: 'center' },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subHeader: { fontSize: 18, marginBottom: 16 },
  total: { fontSize: 20, fontWeight: '600', marginBottom: 20 },
  qrContainer: { alignItems: 'center', marginBottom: 20 },
  qrLabel: { fontSize: 16, marginBottom: 8 },
  donationCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },
  message: { fontSize: 16, marginBottom: 6 },
  amount: { fontWeight: 'bold' },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 8,
  },
});
