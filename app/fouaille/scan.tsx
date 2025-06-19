import { StatusBar } from 'expo-status-bar';
import { CameraView, useCameraPermissions, type CameraType } from 'expo-camera';

import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ScanPage() {
  const [facingDirection, setFacingDirection] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View><Text>Please wait...</Text></View>
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Marcomobile needs camera permission to operate</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  function toggleCameraFacingDirection() {
    setFacingDirection(current => current === 'back' ? 'front' : 'back')
  }

  return (
    <View style={styles.container}>
      <Text>Hello, HoloFR!</Text>
      <CameraView style={styles.camera} facing={facingDirection}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacingDirection}>
            <Text style={styles.text}>Flip camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
