import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";

export default function FouailleHome({ route }) {
  const navigation = useNavigation();
  const [scannerData, setScannerData] = useState('');

  function openScanner() {
    navigation.navigate("Scanner");
  }

  useEffect(() => {
    if (route.params?.scanData) {
      setScannerData(route.params.scanData)
    }
  }, [route.params?.scanData]);

  return (
    <SafeAreaView>
      <TouchableOpacity className="flex-1 flex-end items-center" onPress={openScanner}>
        <Text>Scan a QRCode</Text>
      </TouchableOpacity>

      {scannerData && <Text>{scannerData}</Text>}
    </SafeAreaView>
  )
}
