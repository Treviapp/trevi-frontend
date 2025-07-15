import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

export default function WelcomeBackground({ children, onLayout }) {
  return (
    <ImageBackground
      source={require('../../Assets/Images/welcome-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} onLayout={onLayout}>
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
    backgroundColor: 'rgba(255,255,255,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

