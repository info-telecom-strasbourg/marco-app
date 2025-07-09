import { useNavigation } from '@react-navigation/native';
import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { Button, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ScanPage() {
  const [permission, requestPermission] = useCameraPermissions();
  const navigation = useNavigation();

  if (!permission) {
    return <View><Text>Please wait...</Text></View>
  }

  if (!permission.granted) {
    return (
      <View className={"flex-1 justify-center"}>
        <Text>Marcomobile needs camera permission to operate</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  async function scanCallback({ data }: BarcodeScanningResult) {
    // https://docs.expo.dev/versions/latest/sdk/camera/#dismissscanner
    if (Platform.OS === "ios") {
      await CameraView.dismissScanner();
    }

    console.log("Scanner: " + data);

    navigation.popTo("Fouaille", { scanData: data })
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={"back"} onBarcodeScanned={scanCallback}>

      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
});
