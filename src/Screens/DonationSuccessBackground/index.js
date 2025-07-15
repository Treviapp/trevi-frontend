import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import styles from './Style';

const DonationSuccessBackground = () => {
  return (
    <ImageBackground
      source={require('../../Assets/Images/donationsuccess-bg.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.message}>Thank you for your gift!</Text>
      </View>
    </ImageBackground>
  );
};

export default DonationSuccessBackground;
