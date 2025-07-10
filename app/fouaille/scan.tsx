import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Button, Platform, Text, View } from 'react-native';

export default function ScanPage() {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();

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
  }

  return (
    <View className="flex-1 justify-center">
      <CameraView className="flex-1" facing={"back"} onBarcodeScanned={scanCallback}>

      </CameraView>
    </View>
  );
}
