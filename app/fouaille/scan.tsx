import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { Button, Platform, Text, View, StyleSheet } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import OrderDetailModal from "../../src/components/fouaille/[cartId]";
import { useState } from "react";

export default function ScanPage() {
  const [permission, requestPermission] = useCameraPermissions();
  const [cartId, setCartId] = useState<number>();
  const [visible, setVisible] = useState<boolean>(false);
  const isFocused = useIsFocused();

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
    if (visible) {
     return;
    }

    // https://docs.expo.dev/versions/latest/sdk/camera/#dismissscanner
    if (Platform.OS === "ios") {
      await CameraView.dismissScanner();
    }

    try {
      const { cartId } = JSON.parse(data);
      setCartId(cartId);
      setVisible(true);
      console.log("qrcode scanné !");
    } catch {
          console.log("wrong qrcode");
    }
  }

  return ( isFocused &&
    <View className="flex-1 justify-center items-center">
      <CameraView
        facing={"back"}
        style={{ height: 800, width: 800 }}
        onBarcodeScanned={scanCallback}
        barcodeScannerSettings={{
          barcodeTypes: ['qr', 'ean13', 'ean8', 'code128', 'code39', 'upc_a'],
        }}>
        <View style={style.hole}></View>
      </CameraView>
      {
        visible && 
        <OrderDetailModal
          visible = { visible }
          setVisible = { setVisible }
          cartId = { cartId! }
        >
        </OrderDetailModal>
      }
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
