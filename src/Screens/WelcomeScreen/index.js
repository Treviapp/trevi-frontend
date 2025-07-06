import React from 'react';
import { View, Button } from 'react-native';
import styles from './Style';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Start a New Event"
        onPress={() => navigation.navigate('CreateEvent')}
      />
      <Button
        title="Access My Event"
        onPress={() => navigation.navigate('AccessEvent')}
      />
      <Button
        title="Enter Event Code to Donate"
        onPress={() => navigation.navigate('EnterEvent')}
      />
    </View>
  );
}
