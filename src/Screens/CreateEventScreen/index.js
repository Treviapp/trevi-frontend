import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from './Style';
import { client } from '../../api/config';
import CreateEventBackground from '../CreateEventBackground';

export default function CreateEventScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [eventName, setEventName] = useState('');
  const [email, setEmail] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCreate = async () => {
    if (!fullName.trim() || !eventName.trim() || !email.trim()) {
      Alert.alert('Validation', 'Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('creator_name', fullName);
    formData.append('name', eventName);
    formData.append('creator_email', email);
    formData.append('guest_message', guestMessage);

    if (image) {
      const filename = image.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const ext = match ? match[1] : 'jpg';

      formData.append('host_image', {
        uri: image,
        name: `host.${ext}`,
        type: `image/${ext}`,
      });
    }

    try {
      const response = await client.post('/campaigns', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const data = response.data;
      navigation.navigate('CreateEventSuccessScreen', {
        hostCode: data.host_code,
        guestCode: data.guest_code,
        fullName,
        eventName,
        email,
      });
    } catch (error) {
      console.error('❌ Error:', error, error.response?.data);
      Alert.alert('Error', 'Could not create event. Please try again.');
    }
  };

  return (
    <CreateEventBackground>
      <Text style={styles.title}>Create a New Event</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={eventName}
        onChangeText={setEventName}
      />

      <TextInput
        style={styles.input}
        placeholder="Your Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Write a message for your guests..."
        multiline
        value={guestMessage}
        onChangeText={setGuestMessage}
      />

      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.buttonText}>
          {image ? 'Change Image' : 'Upload Image'}
        </Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 150, height: 150, marginVertical: 10 }}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Create Event</Text>
      </TouchableOpacity>
    </CreateEventBackground>
  );
}