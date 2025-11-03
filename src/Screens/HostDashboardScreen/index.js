import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  View,
  StyleSheet,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import styles from './Style';
import HostDashboardBackground from '../HostDashboardBackground';
import { client } from '../../api/config';
import { useNavigation } from '@react-navigation/native';

const FRONTEND_BASE = 'https://trevi.app/enter/';

export default function HostDashboardScreen({ route, navigation }) {
  const initialCode = route?.params?.hostCode || '';
  const [code, setCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [slow, setSlow] = useState(false);
  const [campaign, setCampaign] = useState(null);
  const [donations, setDonations] = useState([]);
  const [syncing, setSyncing] = useState(false);
  const [isGiftReelOrdered, setIsGiftReelOrdered] = useState(false);
  const navigationHook = useNavigation(); // kept to minimise diffs

  const mounted = useRef(true);
  const slowTimerRef = useRef(null);
  const donationsRef = useRef(donations);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (slowTimerRef.current) {
        clearTimeout(slowTimerRef.current);
        slowTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    donationsRef.current = donations;
  }, [donations]);

  useEffect(() => {
    if (initialCode) {
      handleLoadDashboard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCode]);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const isRetriable = (err) => {
    const status = err?.response?.status;
    return err?.code === 'ECONNABORTED' || !status || status >= 500;
  };

  const dedupe = (raw = []) => {
    const seen = new Set();
    return raw.filter((gift) => {
      const key =
        gift.payment_intent_id ||
        `${gift.message}-${gift.amount}-${gift.created_at}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const handleLoadDashboard = async () => {
    const trimmed = (code || '').trim().toUpperCase();
    if (!trimmed) {
      Alert.alert('Please enter your host code');
      return;
    }

    setLoading(true);
    setSlow(false);
    if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
    slowTimerRef.current = setTimeout(() => setSlow(true), 2000);

    const minLoadMs = 900;
    const start = Date.now();

    try {
      let res;
      // try once, then one retry on transient errors
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          res = await client.get(`/campaigns/host/${trimmed}`, { timeout: 15000 });
          break;
        } catch (err) {
          if (attempt === 0 && isRetriable(err)) {
            await sleep(700); // small backoff
            continue;
          }
          throw err;
        }
      }

      if (!mounted.current) return;
      const data = res.data;
      setCampaign(data);
      setDonations(dedupe(data.donations || []));
      console.log('🧪 Donations loaded:', data.donations);
    } catch (err) {
      if (!mounted.current) return;
      const status = err?.response?.status;
      if (status === 404) {
        Alert.alert('Campaign not found');
      } else if (err?.message === 'Network Error' || err?.code === 'ECONNABORTED') {
        Alert.alert('Network error', 'Check your connection');
      } else {
        console.error('❌ Dashboard load error:', err?.message, err?.response?.data);
        Alert.alert('Unexpected error', err?.message || 'Check Metro logs for details');
      }
    } finally {
      const elapsed = Date.now() - start;
      if (elapsed < minLoadMs) await sleep(minLoadMs - elapsed);

      if (!mounted.current) return;
      setLoading(false);
      if (slowTimerRef.current) {
        clearTimeout(slowTimerRef.current);
        slowTimerRef.current = null;
      }
      // brief initial sync to catch webhook/db lag
      if (trimmed) startInitialSync(trimmed);
    }
  };

  const startInitialSync = async (trimmed) => {
    setSyncing(true);
    const backoffs = [1200, 1700, 2500, 3500, 5000]; // ~14–16s total + jitter
    const t0 = Date.now();
    const MAX_MS = 20000;

    let i = 0;
    while (mounted.current && Date.now() - t0 < MAX_MS) {
      const delay = backoffs[Math.min(i, backoffs.length - 1)] + Math.floor(Math.random() * 300);
      await sleep(delay);
      if (!mounted.current) break;

      try {
        const res = await client.get(`/campaigns/host/${trimmed}`, { timeout: 12000 });
        if (!mounted.current) break;
        const unique = dedupe(res.data?.donations || []);
        if (unique.length !== donationsRef.current.length) {
          setDonations(unique);
          break; // stop once we detect a change
        }
      } catch (_e) {
        // swallow during soft sync
      }
      i++;
    }
    if (mounted.current) setSyncing(false);
  };

  const getTotalRaised = () =>
    donations.reduce((sum, d) => sum + (d.net_payout || 0), 0);

  const handleViewGifts = () => {
    if (!campaign?.host_code) {
      Alert.alert("Missing host code", "We couldn’t find your event code. Please reload your dashboard.");
      return;
    }
    navigation.navigate('GiftListScreen', { hostCode: campaign.host_code });
  };

  const handleGoHome = () => {
    navigation.navigate('Welcome');
  };

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
            editable={!loading}
          />
          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.6 }]}
            onPress={handleLoadDashboard}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.buttonText}>View Dashboard</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.homeButton} onPress={handleGoHome} disabled={loading}>
            <Text style={styles.homeButtonText}>Home</Text>
          </TouchableOpacity>

          {loading && (
            <View style={localStyles.overlay}>
              <ActivityIndicator size="large" />
              <Text style={localStyles.overlayText}>{slow ? 'Still working…' : 'Loading…'}</Text>
            </View>
          )}
        </>
      ) : campaign ? (
        <>
          <View style={{ paddingBottom: 20 }}>
            <Text style={styles.handwritingTitle}>{campaign.title}</Text>
            <Text style={styles.subHeader}>Hosted by {campaign.host}</Text>

            <Text style={styles.totalRaised}>
              Total Raised: £{(getTotalRaised() / 100).toFixed(2)}
            </Text>

            {syncing && (
              <View style={localStyles.syncRow}>
                <ActivityIndicator size="small" />
                <Text style={localStyles.syncText}>Updating…</Text>
              </View>
            )}

            <View style={{ alignItems: 'center', marginVertical: 5 }}>
              <Text style={styles.qrLabel}>Your Event QR code</Text>
              <QRCode
                value={`${FRONTEND_BASE}${campaign.guest_code}`}
                size={180}
              />
              <Text style={styles.qrText}>
                Share this QR code with guests & donors to allow instant access to your event
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.viewGiftsButton}
            onPress={handleViewGifts}
          >
            <Text style={styles.viewGiftsButtonText}>View My Gifts</Text>
          </TouchableOpacity>

          {/* ✅ New Order Gift Reel button */}
          <TouchableOpacity
            style={[styles.button, isGiftReelOrdered && { backgroundColor: 'gray' }]}
            onPress={() => {
              if (!isGiftReelOrdered) {
                navigation.navigate('GiftReelMakePaymentScreen', { hostCode: campaign.host_code });
              }
            }}
            disabled={isGiftReelOrdered}
          >
            <Text style={styles.buttonText}>
              {isGiftReelOrdered ? 'Gift Reel Ordered' : 'Order Your Gift Reel'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
            <Text style={styles.homeButtonText}>Home</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={{ marginTop: 50, alignItems: 'center' }}>
          <ActivityIndicator />
          {loading && (
            <Text style={{ marginTop: 8 }}>{slow ? 'Still working…' : 'Loading…'}</Text>
          )}
        </View>
      )}
    </HostDashboardBackground>
  );
}

const localStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  overlayText: {
    marginTop: 10,
    fontSize: 16,
  },
  syncRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 8,
  },
  syncText: {
    marginLeft: 8,
    fontSize: 14,
  },
});
