import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useRouter } from "expo-router";
import { Button, Platform, Text, View, StyleSheet } from "react-native";

export default function ScanPage() {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();

  if (!permission) {
    return (
      <View>
        <Text>Please wait...</Text>
      </View>
    );
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

    try {
      const { cartId } = JSON.parse(data);

      if (cartId) {
        router.navigate(`/fouaille/carts/${cartId}`);
      }
    } catch {}
  }

  return (
    <View className="flex-1 justify-center items-center">
      <CameraView
        facing={"back"}
        style={{ height: 800, width: 800 }}
        onBarcodeScanned={scanCallback}
      >
        <View style={style.hole}></View>
      </CameraView>
    </View>
  );
}

const style = StyleSheet.create({
  hole: {
    position: "absolute",
    top: 200,
    left: 200,
    width: 150,
    height: 150,
    boxShadow: "0 0 0 9999px rgba(0, 0, 255, 0.6)",
  },
});
