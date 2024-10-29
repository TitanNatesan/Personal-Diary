import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

const LoadingScreen = ({ navigation }) => {
  const [buttonTitle, setButtonTitle] = useState('Unlock');

  const authenticateUser = async () => {
    try {
      // Check if biometrics are available
      const { available, biometryType } = await rnBiometrics.isSensorAvailable();

      if (available && biometryType) {
        const { success } = await rnBiometrics.simplePrompt({
          promptMessage: 'Authenticate to unlock the app',
        });

        if (success) {
          setButtonTitle('Unlocked'); // Change button title
          setTimeout(() => {
            navigation.replace('EditorScreen'); // Navigate to EditorScreen after delay
          }, 200); // 200 ms delay
        } else {
          Alert.alert('Failed', 'Authentication failed. Please try again.');
        }
      } else {
        Alert.alert('Not Available', 'Biometric authentication is not available on this device.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during authentication.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Personal Diary</Text>
      <Button title={buttonTitle} onPress={authenticateUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default LoadingScreen;
