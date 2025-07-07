import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import styles from './Style';  // keep your Style file if it exists

export default function AccessEventScreen({ navigation }) {
  const [code, setCode] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your host code"
        value={code}
        onChangeText={(text) => setCode(text.toUpperCase())} // force uppercase
        autoCapitalize="none"                                // stop keyboard auto-caps
        style={{ borderWidth: 1, padding: 10, marginBottom: 12 }}
      />
      <Button
        title="View Dashboard"
        onPress={() => navigation.replace('HostDashboard', { code })}
      />
    </View>
  );
}

