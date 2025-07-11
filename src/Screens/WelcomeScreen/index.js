import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './Style';

export default function WelcomeScreen({ navigation, onLayout }) {
  return (
    <ImageBackground
      source={require('../../Assets/Images/welcome-bg.png')}
      style={styles.background}
      onLayout={onLayout}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to Trevi</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CreateEvent')}
        >
          <Text style={styles.buttonText}>Start a New Event</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AccessEvent')}
        >
          <Text style={styles.buttonText}>Access My Event</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log('👉 navigating to EnterEvent');
            navigation.navigate('EnterEvent');
          }}
        >
          <Text style={styles.buttonText}>Enter Event Code to Donate</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
