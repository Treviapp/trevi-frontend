import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

export default function EnterEventBackground({ children }) {
  return (
    <ImageBackground
      source={require('../../Assets/Images/enterevent-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {children}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // subtle white overlay
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});